import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockPrismaService = {
    expense: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    expenseParticipant: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create an expense successfully", async () => {
      const createExpenseDto: CreateExpenseDto = {
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };
      const expectedExpense = { id: 1, ...createExpenseDto };

      mockPrismaService.expense.create.mockResolvedValue(expectedExpense);

      const result = await service.create(createExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
        data: createExpenseDto,
      });
      expect(mockPrismaService.expense.create).toHaveBeenCalledTimes(1);
    });

    it("should create an expense with minimal data", async () => {
      const createExpenseDto: CreateExpenseDto = {
        trip_id: 1,
        amount: 50,
      };
      const expectedExpense = { id: 1, ...createExpenseDto };

      mockPrismaService.expense.create.mockResolvedValue(expectedExpense);

      const result = await service.create(createExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
        data: createExpenseDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const expectedExpenses = [
        {
          id: 1,
          trip_id: 1,
          amount: 100.5,
          description: "Hotel",
          date: new Date("2025-07-01T00:00:00.000Z"),
        },
        {
          id: 2,
          trip_id: 1,
          amount: 25.75,
          description: "Dinner",
          date: new Date("2025-07-02T00:00:00.000Z"),
        },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(expectedExpenses);

      const result = await service.findAll();

      expect(result).toEqual(expectedExpenses);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith();
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no expenses exist", async () => {
      mockPrismaService.expense.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return an expense by id", async () => {
      const expenseId = 1;
      const expectedExpense = {
        id: expenseId,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(expectedExpense);

      const result = await service.findOne(expenseId);

      expect(result).toEqual(expectedExpense);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should return null when expense does not exist", async () => {
      const expenseId = 999;
      mockPrismaService.expense.findUnique.mockResolvedValue(null);

      const result = await service.findOne(expenseId);

      expect(result).toBeNull();
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
    });
  });

  describe("update", () => {
    it("should update an expense successfully", async () => {
      const expenseId = 1;
      const updateExpenseDto: UpdateExpenseDto = {
        amount: 120.75,
        description: "Updated hotel accommodation",
      };
      const existingExpense = {
        id: expenseId,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };
      const updatedExpense = { ...existingExpense, ...updateExpenseDto };

      mockPrismaService.expense.update.mockResolvedValue(updatedExpense);

      const result = await service.update(expenseId, updateExpenseDto);

      expect(result).toEqual(updatedExpense);
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: expenseId },
        data: updateExpenseDto,
      });
      expect(mockPrismaService.expense.update).toHaveBeenCalledTimes(1);
    });

    it("should update expense with partial data", async () => {
      const expenseId = 1;
      const updateExpenseDto: UpdateExpenseDto = {
        amount: 150,
      };
      const existingExpense = {
        id: expenseId,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };
      const updatedExpense = { ...existingExpense, ...updateExpenseDto };

      mockPrismaService.expense.update.mockResolvedValue(updatedExpense);

      const result = await service.update(expenseId, updateExpenseDto);

      expect(result).toEqual(updatedExpense);
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: expenseId },
        data: updateExpenseDto,
      });
    });
  });

  describe("remove", () => {
    it("should delete an expense successfully", async () => {
      const expenseId = 1;
      const existingExpense = {
        id: expenseId,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };
      const deletedExpense = { ...existingExpense };

      mockPrismaService.expenseParticipant.deleteMany.mockResolvedValue({
        count: 2,
      });
      mockPrismaService.expense.delete.mockResolvedValue(deletedExpense);

      const result = await service.remove(expenseId);

      expect(result).toEqual(deletedExpense);
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledWith({
        where: { expense_id: expenseId },
      });
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.expense.delete).toHaveBeenCalledTimes(1);
    });

    it("should throw error when deleting non-existent expense", async () => {
      const expenseId = 999;
      const error = new Error("Record to delete does not exist.");

      mockPrismaService.expenseParticipant.deleteMany.mockResolvedValue({
        count: 0,
      });
      mockPrismaService.expense.delete.mockRejectedValue(error);

      await expect(service.remove(expenseId)).rejects.toThrow(error);
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(mockPrismaService.expense.delete).toHaveBeenCalledTimes(1);
    });
  });
});
