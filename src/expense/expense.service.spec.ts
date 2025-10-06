import { NotFoundException } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { Expense } from "@prisma/client";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let expenseCounter = 1;
  let expenses: Expense[] = [];

  const initialExpenses = [
    {
      id: 1,
      dailyPrice: 120,
      discount: false,
      tripId: 101,
    },
    {
      id: 2,
      dailyPrice: 50,
      discount: true,
      tripId: 102,
    },
  ];

  interface ExpenseData {
    data: {
      dailyPrice: number;
      discount: boolean;
      tripId: number;
    };
  }

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: ExpenseData) => {
        const newExpense = { id: expenseCounter++, ...data };
        expenses.push(newExpense);
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

    expenses = [...initialExpenses];
    expenseCounter = initialExpenses.length + 1;

    service = module.get<ExpenseService>(ExpenseService);

    mockDatabaseService.trip.findUnique.mockResolvedValue({
      id: 103,
      startDate: new Date(),
      endDate: new Date(),
      location: "Test Location",
      participant: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new expense", async () => {
    const dto: CreateExpenseDto = {
      dailyPrice: 200,
      discount: false,
      tripId: 103,
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: {
        dailyPrice: dto.dailyPrice,
        discount: dto.discount,
        tripId: dto.tripId,
      },
    });

    expect(result).toEqual({
      id: 3,
      dailyPrice: dto.dailyPrice,
      discount: dto.discount,
      tripId: dto.tripId,
    });
  });

  it("should return all expenses", async () => {
    const mockExpenses: Expense[] = [
      {
        id: 1,
        dailyPrice: 120,
        discount: false,
        tripId: 101,
      },
      {
        id: 2,
        dailyPrice: 50,
        discount: true,
        tripId: 102,
      },
    ];

    mockDatabaseService.expense.findMany.mockResolvedValue(mockExpenses);

    const result = await service.findAll();
    expect(result).toEqual(mockExpenses);
    expect(mockDatabaseService.expense.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock: Expense = {
      id: 1,
      dailyPrice: 120,
      discount: false,
      tripId: 101,
    };

    mockDatabaseService.expense.findUnique.mockResolvedValue(expenseMock);

    const result = await service.findOne(1);

    expect(result).toEqual(expenseMock);
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should throw NotFoundException when expense not found", async () => {
    mockDatabaseService.expense.findUnique.mockResolvedValueOnce(null);

    await expect(service.findOne(500)).rejects.toThrow(NotFoundException);
  });

  it("should update an expense", async () => {
    const dto: UpdateExpenseDto = {
      dailyPrice: 200,
      discount: true,
      tripId: 103,
    };

    const expenseMock: Expense = await service.create({
      dailyPrice: 100,
      discount: false,
      tripId: 101,
    });

    const updatedExpense: Expense = {
      ...expenseMock,
      dailyPrice: 200,
      discount: true,
    };

    mockDatabaseService.expense.update.mockResolvedValue(updatedExpense);

    const result = await service.update(expenseMock.id, dto);

    expect(mockDatabaseService.expense.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedExpense);
    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { id: expenseMock.id },
      data: dto,
    });
  });

  it("should delete an expense", async () => {
    mockDatabaseService.expense.delete.mockResolvedValue(undefined);

    await expect(service.remove(1)).resolves.toBeUndefined();

    expect(mockDatabaseService.expense.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
