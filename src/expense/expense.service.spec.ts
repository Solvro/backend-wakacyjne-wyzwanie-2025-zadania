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
    id: number;
    description: string;
    amount: number;
    currency: string;
    date: Date;
    participant_id: number;
    trip_id: number;
  }[] = [];

  const initialExpenses = [
    {
      id: 1,
      description: "Absolute",
      amount: 4,
      currency: "USD",
      date: new Date("2024-01-01"),
      participant_id: 1,
      trip_id: 1,
    },
    {
      id: 2,
      description: "Cinema",
      amount: 20,
      currency: "USD",
      date: new Date("2024-02-01"),
      participant_id: 1,
      trip_id: 1,
    },
  ];

  interface Expense {
    data: {
      description: string;
      amount: number;
      currency: string;
      date: Date;
      participant_id: number;
      trip_id: number;
    };
  }

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Expense) => {
        const newExpense = { id: expenseCounter++, ...data };
        expensesInMemory.push(newExpense);
        return newExpense;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
    },
    participant: {
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
      id: 1,
      destination: "Test Area",
    });

    mockDatabaseService.participant.findUnique.mockResolvedValue({
      id: 1,
      name: "Test User",
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
      description: "Test Expense",
      amount: 213,
      currency: "USD",
      date: new Date("2024-03-01"),
      participant_id: 1,
      trip_id: 1,
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.description).toBe("Test Expense");

    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: dto,
    });

    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it("should return list of all expenses", async () => {
    const expensesMock = [...expensesInMemory];
    mockDatabaseService.expense.findMany.mockResolvedValue(expensesMock);
    const result = await service.getAll();

    expect(result).toEqual(expensesMock);
    expect(mockDatabaseService.expense.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock = expensesInMemory[0];
    mockDatabaseService.expense.findUnique.mockResolvedValue(expenseMock);

    const result = await service.getOne(1);

    expect(result).toEqual(expenseMock);
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update an expense", async () => {
    const expenseMock = expensesInMemory[0];

    const expenseUpdated = {
      ...expenseMock,
      amount: 2000,
    };

    mockDatabaseService.expense.update.mockResolvedValue(expenseUpdated);

    const result = await service.update(expenseMock.id, { amount: 2000 });

    expect(mockDatabaseService.expense.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expenseUpdated);
    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { id: expenseMock.id },
      data: { amount: 2000 },
    });
  });

  it("should delete an expense", async () => {
    const expenseMock = expensesInMemory[0];
    mockDatabaseService.expense.delete.mockResolvedValue(expenseMock);

    await expect(service.delete(expenseMock.id)).resolves.toBeUndefined();

    expect(mockDatabaseService.expense.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { id: expenseMock.id },
    });
  });

  it("should throw NotFoundException when expense not found", async () => {
    mockDatabaseService.expense.findUnique.mockResolvedValue(null);

    await expect(service.getOne(999)).rejects.toThrow(NotFoundException);
  });
});
