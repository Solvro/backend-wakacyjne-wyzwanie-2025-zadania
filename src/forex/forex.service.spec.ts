import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ForexService } from "./forex.service";

// Mock fetch globally
globalThis.fetch = jest.fn();

describe("ForexService", () => {
  let service: ForexService;

  const mockPrismaService = {
    forexRate: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForexService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ForexService>(ForexService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCurrentRates", () => {
    it("should fetch and save currency rates successfully", async () => {
      // Mock successful NBP API response
      const mockNBPResponse = [
        {
          table: "A",
          no: "123/A/NBP/2025",
          effectiveDate: "2025-09-20",
          rates: [
            { currency: "dolar amerykański", code: "USD", mid: 4.1234 },
            { currency: "euro", code: "EUR", mid: 4.5678 },
            { currency: "funt szterling", code: "GBP", mid: 5.2345 },
          ],
        },
      ];

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockNBPResponse),
      });

      mockPrismaService.forexRate.create
        .mockResolvedValueOnce({
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        })
        .mockResolvedValueOnce({
          currencyName: "EUR",
          rate: 4.5678,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        })
        .mockResolvedValueOnce({
          currencyName: "GBP",
          rate: 5.2345,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        });

      const result = await service.fetchCurrentRates();

      expect(result.fetchedCount).toBe(3);
      expect(result.rates).toHaveLength(3);
      expect(result.rates[0].currencyName).toBe("USD");
      expect(result.rates[0].rate).toBe(4.1234);
      expect(mockPrismaService.forexRate.create).toHaveBeenCalledTimes(3);
    });

    it("should throw BadRequestException when NBP API fails", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(service.fetchCurrentRates()).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should throw BadRequestException when no data received", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      });

      await expect(service.fetchCurrentRates()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe("getLatestRates", () => {
    it("should return latest rates from database", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        },
        {
          currencyName: "EUR",
          rate: 4.5678,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockRates);

      const result = await service.getLatestRates();

      expect(result).toHaveLength(2);
      expect(result[0].currencyName).toBe("USD");
      expect(result[0].rate).toBe(4.1234);
    });
  });

  describe("getRatesHistory", () => {
    it("should return rates history for all currencies", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        },
      ];

      mockPrismaService.forexRate.findMany.mockResolvedValue(mockRates);

      const result = await service.getRatesHistory();

      expect(result).toHaveLength(1);
      expect(mockPrismaService.forexRate.findMany).toHaveBeenCalledWith({
        where: {
          currencyName: {
            in: ["USD", "EUR", "GBP"],
          },
        },
        orderBy: {
          fetchedAt: "desc",
        },
        take: 10,
      });
    });

    it("should return rates history for specific currency", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: new Date("2025-09-20T10:00:00Z"),
        },
      ];

      mockPrismaService.forexRate.findMany.mockResolvedValue(mockRates);

      const result = await service.getRatesHistory("USD", 5);

      expect(result).toHaveLength(1);
      expect(mockPrismaService.forexRate.findMany).toHaveBeenCalledWith({
        where: { currencyName: "USD" },
        orderBy: {
          fetchedAt: "desc",
        },
        take: 5,
      });
    });
  });
});
