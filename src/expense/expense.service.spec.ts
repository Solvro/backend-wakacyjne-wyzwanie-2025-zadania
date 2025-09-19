import { Currency } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validExpense } from "../../test/test-utils";
import { CurrencyService } from "../currency/currency.service";
import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    exchangeRate: {
      findFirst: jest.fn().mockResolvedValue({
        currency: Currency.USD,
        exchange_rate: 3.6,
        timestamp: new Date(),
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, DatabaseService, CurrencyService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new expense", async () => {
    const dto = validExpense();

    const createdExpense = {
      id: 1,
      ...dto,
    };
    mockDatabaseService.expense.create.mockResolvedValue(createdExpense);

    const result = await service.create(dto);

    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        value: dto.value * 3.6,
        date: dto.date,
        currency: Currency.PLN,
        trip_participant: {
          connect: { id: 1 },
        },
      },
    });

    expect(result).toEqual(createdExpense);
  });

  it("should return all expenses", async () => {
    const mockExpenses = [
      {
        id: 1,
        ...validExpense(),
      },
      {
        id: 2,
        ...validExpense(),
      },
    ];

    mockDatabaseService.expense.findMany.mockResolvedValue(mockExpenses);

    const result = await service.findAll();

    expect(result.length).toEqual(mockExpenses.length);
    expect(result).toEqual(mockExpenses);
  });

  it("should return a single expense", async () => {
    const mockExpense = {
      id: 5,
      ...validExpense(),
    };
    mockDatabaseService.expense.findUnique.mockResolvedValue(mockExpense);

    const result = await service.findOne(5);
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
      where: { id: 5 },
    });
    expect(result).toEqual(mockExpense);
  });

  it("Should return a 404 not found", async () => {
    mockDatabaseService.expense.findUnique.mockResolvedValue(null);

    await expect(service.findOne(5)).rejects.toThrow(NotFoundException);
  });

  it("should update an expense", async () => {
    const updatedExpense = {
      id: 1,
      ...validExpense(),
      name: "updatedTestExpense",
    };

    const existingExpense = {
      id: 1,
      ...validExpense(),
    };

    mockDatabaseService.expense.findUnique.mockResolvedValue(existingExpense);
    mockDatabaseService.expense.update.mockResolvedValue(updatedExpense);

    const result = await service.update(1, { name: "updatedTestExpense" });

    expect(result).toEqual(updatedExpense);
    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: "updatedTestExpense",
        trip_participant: {
          connect: {
            id: 1,
          },
        },
      },
    });
  });

  it("should throw an error if expense doesnt exist while updating", async () => {
    mockDatabaseService.expense.findUnique.mockResolvedValue(null);

    await expect(
      service.update(777, { description: "testDescription" }),
    ).rejects.toThrow("Expense not found");
  });

  it("should delete an expense", async () => {
    const deletedExpense = {
      id: 1,
      ...validExpense(),
    };
    mockDatabaseService.expense.delete.mockResolvedValue(deletedExpense);

    const result = await service.remove(1);

    expect(result).toEqual(deletedExpense);
    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
