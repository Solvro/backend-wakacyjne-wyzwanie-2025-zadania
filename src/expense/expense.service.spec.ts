import { Category } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockDatabaseService = {
    trip: {
      findUnique: jest.fn(),
    },
    expense: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create an expense if trip exists", async () => {
      const dto = {
        amount: 100,
        category: Category.FOOD,
        description: "Lunch",
        tripId: 1,
      };
      const trip = { trip_id: 1, destination: "Paris" };
      const expense = { expense_id: 1, ...dto, trip };

      mockDatabaseService.trip.findUnique.mockResolvedValue(trip);
      mockDatabaseService.expense.create.mockResolvedValue(expense);

      const result = await service.create(dto);

      expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDatabaseService.expense.create).toHaveBeenCalled();
      expect(result).toEqual(expense);
    });

    it("should throw if trip not found", async () => {
      mockDatabaseService.trip.findUnique.mockResolvedValue(null);

      await expect(
        service.create({
          amount: 100,
          category: Category.FOOD,
          description: "Lunch",
          tripId: 99,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const expenses = [{ expense_id: 1, amount: 100 }];
      mockDatabaseService.expense.findMany.mockResolvedValue(expenses);

      const result = await service.findAll();

      expect(mockDatabaseService.expense.findMany).toHaveBeenCalled();
      expect(result).toEqual(expenses);
    });
  });

  describe("findOne", () => {
    it("should return expense if found", async () => {
      const expense = { expense_id: 1, amount: 100 };
      mockDatabaseService.expense.findUnique.mockResolvedValue(expense);

      const result = await service.findOne(1);

      expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
        where: { expense_id: 1 },
        include: { trip: { select: { destination: true } } },
      });
      expect(result).toEqual(expense);
    });

    it("should throw if not found", async () => {
      mockDatabaseService.expense.findUnique.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update an expense if exists", async () => {
      const dto = { amount: 200, description: "Dinner" };
      const existing = { expense_id: 1 };
      const updated = { expense_id: 1, amount: 200, description: "Dinner" };

      mockDatabaseService.expense.findUnique.mockResolvedValueOnce(existing);
      mockDatabaseService.expense.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(mockDatabaseService.expense.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { expense_id: 1 },
          data: { amount: 200, description: "Dinner" },
        }),
      );
      expect(result).toEqual(updated);
    });

    it("should throw if expense not found", async () => {
      mockDatabaseService.expense.findUnique.mockResolvedValueOnce(null);

      await expect(service.update(99, { amount: 200 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw if new trip does not exist", async () => {
      const existing = { expense_id: 1 };
      mockDatabaseService.expense.findUnique.mockResolvedValueOnce(existing);
      mockDatabaseService.trip.findUnique.mockResolvedValueOnce(null);

      await expect(service.update(1, { tripId: 123 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should delete an expense if found", async () => {
      const expense = { expense_id: 1 };
      mockDatabaseService.expense.findUnique.mockResolvedValueOnce(expense);
      mockDatabaseService.expense.delete.mockResolvedValueOnce(expense);

      const result = await service.remove(1);

      expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
        where: { expense_id: 1 },
      });
      expect(result).toEqual({
        message: "Expense with ID 1 deleted successfully",
      });
    });

    it("should throw if not found", async () => {
      mockDatabaseService.expense.findUnique.mockResolvedValueOnce(null);

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
