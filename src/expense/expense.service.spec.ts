/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { expense_category } from "@prisma/client";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { CurrencyService } from "../currency/currency.service";
import { DatabaseService } from "../database/database.service";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let database: DatabaseService;

  let _currency: CurrencyService;

  const mockCurrency = {
    find_most_recent_rate: jest.fn(),
  };
  // Bazowe mocki wydatków
  const mockExpenseBase = {
    trip_id: expect.any(Number),
    amount: expect.any(Number),
    category: expect.any(String),
  };

  const mockExpense1 = {
    id: 1,
    trip_id: 1,
    amount: 150.5,
    category: expense_category.food,
  };

  const mockExpense2 = {
    id: 2,
    trip_id: 1,
    amount: 200,
    category: expense_category.transport,
  };

  const mockDatabase = {
    expense: {
      findMany: jest.fn().mockResolvedValue([mockExpense1, mockExpense2]),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
          return mockExpense1;
        }
        if (where.id === 2) {
          return mockExpense2;
        }
        return null;
      }),
      create: jest.fn().mockImplementation(({ data }) => ({
        id: 3,
        ...mockExpenseBase,
        ...data,
      })),
      update: jest.fn().mockImplementation(({ where, data }) => ({
        ...mockExpense1,
        ...data,
        id: where.id,
      })),
      delete: jest.fn().mockResolvedValue(mockExpense1),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: DatabaseService, useValue: mockDatabase },
        { provide: CurrencyService, useValue: mockCurrency },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    database = module.get<DatabaseService>(DatabaseService);
    _currency = module.get<CurrencyService>(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  describe("create", () => {
    it("powinien utworzyć nowy wydatek", async () => {
      const dto: CreateExpenseDto = {
        trip_id: 1,
        amount: 99.99,
        category: expense_category.other,
      };

      const result = await service.create(dto);

      expect(result).toHaveProperty("id");
      expect(result.trip_id).toBe(dto.trip_id);
      expect(result.amount).toBe(dto.amount);
      expect(result.category).toBe(dto.category);
      expect(database.expense.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić listę wszystkich wydatków", async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].trip_id).toBe(1);
      expect(result[0].amount).toBe(150.5);
      expect(result[0].category).toBe(expense_category.food);
      expect(result[1].trip_id).toBe(1);
      expect(result[1].amount).toBe(200);
      expect(result[1].category).toBe(expense_category.transport);
      expect(database.expense.findMany).toHaveBeenCalledTimes(1);
    });

    it("powinien wywołać findMany bez parametrów", async () => {
      await service.findAll();

      expect(database.expense.findMany).toHaveBeenCalledWith();
    });
  });

  describe("findOne", () => {
    it("powinien zwrócić wydatek po ID", async () => {
      const result = await service.findOne(1);

      expect(result?.id).toBe(1);
      expect(result?.trip_id).toBe(1);
      expect(result?.amount).toBe(150.5);
      expect(result?.category).toBe(expense_category.food);
      expect(database.expense.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("powinien zwrócić null, jeśli wydatek nie istnieje", async () => {
      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(database.expense.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe("update", () => {
    it("powinien zaktualizować kwotę wydatku", async () => {
      const dto: UpdateExpenseDto = {
        amount: 175.25,
      };

      const result = await service.update(1, dto);

      expect(result.id).toBe(1);
      expect(result.amount).toBe(175.25);
      expect(database.expense.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });

    it("powinien zaktualizować kategorię wydatku", async () => {
      const dto: UpdateExpenseDto = {
        category: expense_category.transport,
      };

      const result = await service.update(1, dto);

      expect(result.id).toBe(1);
      expect(result.category).toBe(expense_category.transport);
      expect(database.expense.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe("remove", () => {
    it("powinien usunąć wydatek po ID", async () => {
      const result = await service.remove(1);

      expect(result.id).toBe(1);
      expect(result.trip_id).toBe(1);
      expect(result.amount).toBe(150.5);
      expect(result.category).toBe(expense_category.food);
      expect(database.expense.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
