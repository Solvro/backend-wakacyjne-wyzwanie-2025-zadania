/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  let expenseCounter = 1;

  let expensesInMemory: {
    expenseId: number;
    trip: { connect: { tripId: number } };
    expenseAmount: number;
    expenseDescription: string;
    currencyCode: string;
  }[] = [];

  const initialExpenses = [
    {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 4,
      expenseDescription: "Absolute",
      currencyCode: "PLN",
    },
    {
      expenseId: 2,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 20,
      expenseDescription: "Cinema",
      currencyCode: "PLN",
    },
  ];

  interface Expense {
    data: {
      trip: {
        connect: { tripId: number };
      };
      expenseAmount: number;
      expenseDescription: string;
      currencyCode: string;
    };
  }

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Expense) => {
        const newExpense = { expenseId: expenseCounter++, ...data };
        expensesInMemory.push(newExpense);
        return newExpense;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    mockDatabaseService.trip.findUnique.mockResolvedValue({
      tripId: 1,
      destination: "Test Area",
    });

    expensesInMemory = [...initialExpenses];
    expenseCounter = initialExpenses.length + 1;

    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new expense", async () => {
    const dto = {
      tripId: 1,
      expenseAmount: 213,
      expenseDescription: "Test Value",
      currencyCode: "PLN",
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("expenseId");

    expect(result.expenseDescription).toBe("Test Value");

    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: {
        expenseAmount: dto.expenseAmount,
        expenseDescription: dto.expenseDescription,
        trip: { connect: { tripId: dto.tripId } },
      },
    });

    expect(result).toEqual({
      expenseId: expect.any(Number),
      trip: {
        connect: {
          tripId: 1,
        },
      },
      expenseAmount: 213,
      expenseDescription: "Test Value",
    });
  });

  it("should return list of all expenses", async () => {
    const expensesMock = [...expensesInMemory];
    mockDatabaseService.expense.findMany.mockResolvedValue(expensesMock);
    const result = await service.findAll();

    expect(result).toEqual(expensesMock);
    expect(mockDatabaseService.expense.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock = {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 213,
      expenseDescription: "Test Value",
      currencyCode: "PLN",
    };

    mockDatabaseService.expense.findUnique.mockResolvedValue(expenseMock);
    const result = await service.findOne(1);

    expect(result).toEqual(expenseMock);
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a expense", async () => {
    const dto = {
      tripId: 1,
      expenseAmount: 213,
      expenseDescription: "Test Value",
      currencyCode: "PLN",
    };
    const expenseMock = await service.create(dto);

    const expenseUpdated = {
      expenseId: expenseMock.expenseId,
      tripId: 1,
      expenseAmount: 2000,
      expenseDescription: "Test Value",
      currencyCode: "PLN",
    };

    const dtoUpdate = {
      expenseAmount: 2000,
    };

    mockDatabaseService.expense.update.mockResolvedValue(expenseUpdated);

    const result = await service.update(expenseMock.expenseId, dtoUpdate);

    expect(mockDatabaseService.expense.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expenseUpdated);
    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { expenseId: expenseMock.expenseId },
      data: dtoUpdate,
    });
  });

  it("should delete a expense", async () => {
    const expenseMock = {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 213,
      expenseDescription: "Test Value",
      currencyCode: "PLN",
    };

    mockDatabaseService.expense.delete.mockResolvedValue(expenseMock);

    const result = await service.remove(1);

    expect(result).toEqual(expenseMock);
    expect(mockDatabaseService.expense.delete).toHaveBeenCalled();
    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { expenseId: 1 },
    });
  });

  it("should throw NotFoundException when expense not found", async () => {
    mockDatabaseService.expense.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
