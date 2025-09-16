import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let db: DatabaseService;

  const mockDb = {
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
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    db = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create expense if trip exists", async () => {
      const dto = {
        trip_id: 1,
        expense_type: "FOOD",
        expense_date: new Date("2025-01-01"),
        cost: 100,
        description: "Lunch",
      };

      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue({ trip_id: 1 });
      const created = { expense_id: 1, ...dto };
      (mockDb.expense.create as jest.Mock).mockResolvedValue(created);

      const result = await service.create(dto as any);

      expect(result).toEqual(created);
      expect(mockDb.trip.findUnique).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDb.expense.create).toHaveBeenCalled();
    });

    it("should throw if trip not found", async () => {
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create({
          trip_id: 1,
          expense_type: "FOOD",
          expense_date: new Date(),
          cost: 10,
          description: "x",
        } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const expenses = [{ expense_id: 1, description: "Hotel" }];
      (mockDb.expense.findMany as jest.Mock).mockResolvedValue(expenses);

      const result = await service.findAll();

      expect(result).toEqual(expenses);
      expect(mockDb.expense.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return expense if found", async () => {
      const expense = { expense_id: 1, description: "Taxi" };
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(expense);

      const result = await service.findOne(1);
      expect(result).toEqual(expense);
    });

    it("should throw if not found", async () => {
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update expense if found", async () => {
      const existing = { expense_id: 1, expense_date: new Date("2025-01-01") };
      const updated = { expense_id: 1, description: "Updated" };

      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(existing);
      (mockDb.expense.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(1, { description: "Updated" } as any);

      expect(result).toEqual(updated);
      expect(mockDb.expense.update).toHaveBeenCalled();
    });

    it("should throw if expense not found", async () => {
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update(1, { description: "x" } as any),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw if trip_id does not exist", async () => {
      const existing = { expense_id: 1, expense_date: new Date("2025-01-01") };
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(existing);
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, { trip_id: 99 } as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should delete expense if found", async () => {
      const existing = { expense_id: 1 };
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(existing);

      await service.remove(1);

      expect(mockDb.expense.delete).toHaveBeenCalledWith({
        where: { expense_id: 1 },
      });
    });

    it("should throw if expense not found", async () => {
      (mockDb.expense.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
