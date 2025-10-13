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
      create: jest.fn(),
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

      // Mock ForexRate record
      const mockForexRate = {
        id: 1,
        currency: "USD",
        rate: 4,
        fetchedAt: new Date(),
      };
      mockPrismaService.forexRate.findFirst.mockResolvedValue(mockForexRate);

      // Mock payment creation
      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "USD",
        plnAmount: 400,
        forexRateId: 1,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
        exchangeRate: mockForexRate,
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
      expect(mockPrismaService.forexRate.findFirst).toHaveBeenCalledWith({
        where: {
          currency: "USD",
          rate: 4,
        },
        orderBy: { fetchedAt: "desc" },
      });
      expect(mockPrismaService.payment.create).toHaveBeenCalledWith({
        data: {
          title: "Test Payment",
          description: "Test payment description",
          originalAmount: 100,
          originalCurrency: "USD",
          plnAmount: 400,
          forexRateId: 1,
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

      // Mock PLN ForexRate record
      const mockPlnForexRate = {
        id: 2,
        currency: "PLN",
        rate: 1,
        fetchedAt: new Date(),
      };
      mockPrismaService.forexRate.findFirst.mockResolvedValue(mockPlnForexRate);

      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "PLN",
        plnAmount: 100,
        forexRateId: 2,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
        exchangeRate: mockPlnForexRate,
      };
      mockPrismaService.payment.create.mockResolvedValue(mockPayment);

      const result = await service.createPayment(plnPaymentDto);

      expect(result.plnAmount).toBe(100);
      expect(result.exchangeRate).toBe(1);
      expect(mockForexService.getLatestRates).not.toHaveBeenCalled();
      expect(mockPrismaService.forexRate.findFirst).toHaveBeenCalledWith({
        where: { currency: "PLN" },
        orderBy: { fetchedAt: "desc" },
      });
    });

    it("should throw error when exchange rate not available", async () => {
      mockForexService.getLatestRates.mockResolvedValue([]);

      await expect(service.createPayment(createPaymentDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should create ForexRate record when not found", async () => {
      // Mock exchange rate
      mockForexService.getLatestRates.mockResolvedValue([
        { currencyName: "EUR", rate: 4.5 },
      ]);

      // Mock no existing ForexRate record found
      mockPrismaService.forexRate.findFirst.mockResolvedValue(null);

      // Mock ForexRate creation
      const mockCreatedForexRate = {
        id: 3,
        currency: "EUR",
        rate: 4.5,
        fetchedAt: new Date(),
      };
      mockPrismaService.forexRate.create.mockResolvedValue(
        mockCreatedForexRate,
      );

      // Mock payment creation
      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "EUR",
        plnAmount: 450,
        forexRateId: 3,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
        exchangeRate: mockCreatedForexRate,
      };
      mockPrismaService.payment.create.mockResolvedValue(mockPayment);

      const eurPaymentDto: CreatePaymentDto = {
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: SupportedCurrency.EUR,
      };

      const result = await service.createPayment(eurPaymentDto);

      expect(result.exchangeRate).toBe(4.5);
      expect(mockPrismaService.forexRate.create).toHaveBeenCalledWith({
        data: {
          currency: "EUR",
          rate: 4.5,
          fetchedAt: expect.any(Date) as Date,
        },
      });
    });

    it("should create PLN ForexRate record when not found", async () => {
      const plnPaymentDto: CreatePaymentDto = {
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: SupportedCurrency.PLN,
      };

      // Mock no existing PLN ForexRate record found
      mockPrismaService.forexRate.findFirst.mockResolvedValue(null);

      // Mock PLN ForexRate creation
      const mockCreatedPlnForexRate = {
        id: 4,
        currency: "PLN",
        rate: 1,
        fetchedAt: new Date(),
      };
      mockPrismaService.forexRate.create.mockResolvedValue(
        mockCreatedPlnForexRate,
      );

      // Mock payment creation
      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "PLN",
        plnAmount: 100,
        forexRateId: 4,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
        exchangeRate: mockCreatedPlnForexRate,
      };
      mockPrismaService.payment.create.mockResolvedValue(mockPayment);

      const result = await service.createPayment(plnPaymentDto);

      expect(result.plnAmount).toBe(100);
      expect(result.exchangeRate).toBe(1);
      expect(mockPrismaService.forexRate.create).toHaveBeenCalledWith({
        data: {
          currency: "PLN",
          rate: 1,
          fetchedAt: expect.any(Date) as Date,
        },
      });
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
      const mockForexRate = {
        id: 1,
        currency: "USD",
        rate: 4,
        fetchedAt: new Date(),
      };

      const mockPayment = {
        id: 1,
        title: "Test Payment",
        description: "Test payment description",
        originalAmount: 100,
        originalCurrency: "USD",
        plnAmount: 400,
        forexRateId: 1,
        status: "PENDING",
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tripId: null,
        expenseId: null,
        exchangeRate: mockForexRate,
      };
      mockPrismaService.payment.findUnique.mockResolvedValue(mockPayment);

      const result = await service.getPaymentById(1);

      expect(result.id).toBe(1);
      expect(result.title).toBe("Test Payment");
      expect(result.exchangeRate).toBe(4);
      expect(mockPrismaService.payment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { exchangeRate: true },
      });
    });

    it("should throw NotFoundException when payment not found", async () => {
      mockPrismaService.payment.findUnique.mockResolvedValue(null);

      await expect(service.getPaymentById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
