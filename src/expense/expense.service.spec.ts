import { ExpenseType } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockDatabase = {
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
      providers: [
        ExpenseService,
        {
          provide: DatabaseService,
          useValue: mockDatabase,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create expense if trip exists", async () => {
      const dto: CreateExpenseDto = {
        trip_id: 1,
        expense_type: ExpenseType.FOOD, // ✅ enum zamiast any
        expense_date: new Date("2025-01-01"),
        cost: 100,
        description: "Lunch",
      };

      mockDatabase.trip.findUnique.mockResolvedValue({ trip_id: 1 });
      const created = Object.assign({ expense_id: 1 }, dto);
      mockDatabase.expense.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);
      expect(mockDatabase.trip.findUnique).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDatabase.expense.create).toHaveBeenCalled();
    });

    it("should throw if trip not found", async () => {
      mockDatabase.trip.findUnique.mockResolvedValue(null);

      const dto: CreateExpenseDto = {
        trip_id: 1,
        expense_type: ExpenseType.FOOD, // ✅ enum zamiast any
        expense_date: new Date(),
        cost: 10,
        description: "x",
      };

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update expense if found", async () => {
      const existing = { expense_id: 1, expense_date: new Date("2025-01-01") };
      const dto: UpdateExpenseDto = { description: "Updated" };
      const updated = Object.assign({ expense_id: 1 }, dto);

      mockDatabase.expense.findUnique.mockResolvedValue(existing);
      mockDatabase.expense.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);
      expect(mockDatabase.expense.update).toHaveBeenCalled();
    });
  });
});
