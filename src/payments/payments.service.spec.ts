import { BadRequestException, NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ForexService } from "../forex/forex.service";
import { PrismaService } from "../prisma/prisma.service";
import type { CreatePaymentDto } from "./dto/payment.dto";
import { SupportedCurrency } from "./dto/payment.dto";
import { PaymentsService } from "./payments.service";

describe("PaymentsService", () => {
  let service: PaymentsService;

  const mockPrismaService = {
    payment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
    },
    expense: {
      findUnique: jest.fn(),
    },
    forexRate: {
      findFirst: jest.fn(),
    },
  };

  const mockForexService = {
    getLatestRates: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ForexService,
          useValue: mockForexService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);

    jest.clearAllMocks();
  });

  describe("createPayment", () => {
    const createPaymentDto: CreatePaymentDto = {
      title: "Test Payment",
      description: "Test payment description",
      originalAmount: 100,
      originalCurrency: SupportedCurrency.USD,
    };

    it("should create payment with currency conversion", async () => {
      // Mock exchange rate
      mockForexService.getLatestRates.mockResolvedValue([
        { currencyName: "USD", rate: 4 },
      ]);

      // Mock payment creation
      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "USD",
        plnAmount: 400,
        exchangeRate: 4,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
      };
      mockPrismaService.payment.create.mockResolvedValue(mockPayment);

      const result = await service.createPayment(createPaymentDto);

      expect(result).toEqual({
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "USD",
        plnAmount: 400,
        exchangeRate: 4,
        status: "PENDING",
        processedAt: undefined,
        createdAt: mockPayment.createdAt.toISOString(),
        updatedAt: mockPayment.updatedAt.toISOString(),
        tripId: undefined,
        expenseId: undefined,
      });

      expect(mockForexService.getLatestRates).toHaveBeenCalled();
      expect(mockPrismaService.payment.create).toHaveBeenCalledWith({
        data: {
          title: "Test Payment",
          description: "Test payment description",
          originalAmount: 100,
          originalCurrency: "USD",
          plnAmount: 400,
          exchangeRate: 4,
          status: "PENDING",
          tripId: null,
          expenseId: null,
          createdAt: expect.any(Date) as Date,
        },
      });
    });

    it("should create PLN payment without conversion", async () => {
      const plnPaymentDto: CreatePaymentDto = {
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: SupportedCurrency.PLN,
      };

      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "PLN",
        plnAmount: 100,
        exchangeRate: null,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
      };
      mockPrismaService.payment.create.mockResolvedValue(mockPayment);

      const result = await service.createPayment(plnPaymentDto);

      expect(result.plnAmount).toBe(100);
      expect(result.exchangeRate).toBeUndefined();
      expect(mockForexService.getLatestRates).not.toHaveBeenCalled();
    });

    it("should throw error when exchange rate not available", async () => {
      mockForexService.getLatestRates.mockResolvedValue([]);

      await expect(service.createPayment(createPaymentDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should validate trip exists when tripId provided", async () => {
      const paymentWithTrip: CreatePaymentDto = {
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: SupportedCurrency.USD,
        tripId: 1,
      };
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.createPayment(paymentWithTrip)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("getPaymentById", () => {
    it("should return payment when found", async () => {
      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "USD",
        plnAmount: 400,
        exchangeRate: 4,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
      };
      mockPrismaService.payment.findUnique.mockResolvedValue(mockPayment);

      const result = await service.getPaymentById(1);

      expect(result.id).toBe(1);
      expect(result.title).toBe("Test Payment");
    });

    it("should throw NotFoundException when payment not found", async () => {
      mockPrismaService.payment.findUnique.mockResolvedValue(null);

      await expect(service.getPaymentById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
