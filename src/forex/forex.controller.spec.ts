import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { ForexController } from "./forex.controller";
import { ForexService } from "./forex.service";

describe("ForexController", () => {
  let controller: ForexController;

  const mockForexService = {
    fetchCurrentRates: jest.fn(),
    getLatestRates: jest.fn(),
    getRatesHistory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForexController],
      providers: [
        {
          provide: ForexService,
          useValue: mockForexService,
        },
      ],
    }).compile();

    controller = module.get<ForexController>(ForexController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCurrentRates", () => {
    it("should fetch current rates successfully", async () => {
      const mockResponse = {
        fetchedCount: 3,
        rates: [
          {
            currencyName: "USD",
            rate: 4.1234,
            fetchedAt: "2025-09-20T10:00:00.000Z",
          },
        ],
        fetchedAt: "2025-09-20T10:00:00.000Z",
      };

      mockForexService.fetchCurrentRates.mockResolvedValue(mockResponse);

      const result = await controller.fetchCurrentRates();

      expect(result).toEqual(mockResponse);
      expect(mockForexService.fetchCurrentRates).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLatestRates", () => {
    it("should return latest rates", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
        {
          currencyName: "EUR",
          rate: 4.5678,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
      ];

      mockForexService.getLatestRates.mockResolvedValue(mockRates);

      const result = await controller.getLatestRates();

      expect(result).toEqual(mockRates);
      expect(mockForexService.getLatestRates).toHaveBeenCalledTimes(1);
    });
  });

  describe("getRatesHistory", () => {
    it("should return rates history with default parameters", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
      ];

      mockForexService.getRatesHistory.mockResolvedValue(mockRates);

      const result = await controller.getRatesHistory();

      expect(result).toEqual(mockRates);
      expect(mockForexService.getRatesHistory).toHaveBeenCalledWith(
        undefined,
        10,
      );
    });

    it("should return rates history with currency filter", async () => {
      const mockRates = [
        {
          currencyName: "USD",
          rate: 4.1234,
          fetchedAt: "2025-09-20T10:00:00.000Z",
        },
      ];

      mockForexService.getRatesHistory.mockResolvedValue(mockRates);

      const result = await controller.getRatesHistory("USD", 5);

      expect(result).toEqual(mockRates);
      expect(mockForexService.getRatesHistory).toHaveBeenCalledWith("USD", 5);
    });

    it("should throw BadRequestException for invalid currency code", async () => {
      await expect(controller.getRatesHistory("INVALID")).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should throw BadRequestException for invalid limit", async () => {
      await expect(controller.getRatesHistory("USD", 0)).rejects.toThrow(
        BadRequestException,
      );

      await expect(controller.getRatesHistory("USD", 101)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
