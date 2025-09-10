import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  let expenseCounter = 1;

  let expensesInMemory: {
    expenseId: number;
    trip: { connect: { tripId: number } };
    expenseAmount: number;
    expenseDescription: string;
  }[] = [];

  const initialExpenses = [
    {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 4,
      expenseDescription: "Absolute",
    },
    {
      expenseId: 2,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 20,
      expenseDescription: "Cinema",
    },
  ];

  interface Expense {
    data: {
      trip: {
        connect: { tripId: number };
      };
      expenseAmount: number;
      expenseDescription: string;
    };
  }

  const mockExpenseService = {
    create: jest.fn(({ data }: Expense) => {
      const newExpense = { expenseId: expenseCounter++, ...data };
      expensesInMemory.push(newExpense);
      return newExpense;
    }) as jest.Mock,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        { provide: ExpenseService, useValue: mockExpenseService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    expensesInMemory = [...initialExpenses];
    expenseCounter = initialExpenses.length + 1;

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const dto = {
      tripId: 1,
      expenseAmount: 213,
      expenseDescription: "Test Value",
    };

    const expectedValue = { expenseId: expenseCounter, ...dto };
    mockExpenseService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);

    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all expenses", async () => {
    const expensesMock = [...expensesInMemory];

    mockExpenseService.findAll.mockResolvedValue(expensesMock);

    const result = await controller.findAll();

    expect(result).toEqual(expensesMock);
    expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock = {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 213,
      expenseDescription: "Test Value",
    };

    mockExpenseService.findOne.mockResolvedValue(expenseMock);
    const result = await controller.findOne(1);

    expect(result).toEqual(expenseMock);
    expect(mockExpenseService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should update a expense", async () => {
    const dto = {
      tripId: 1,
      expenseAmount: 213,
      expenseDescription: "Test Value",
    };
    const expenseMock = await controller.create(dto); // id == 3

    const expenseUpdated = {
      expenseId: expenseMock.expenseId,
      tripId: 1,
      expenseAmount: 2000,
      expenseDescription: "Test Value",
    };

    const dtoUpdate = {
      expenseAmount: 2000,
    };

    mockExpenseService.update.mockResolvedValue(expenseUpdated);

    const result = await controller.update(expenseMock.expenseId, dtoUpdate);

    expect(mockExpenseService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expenseUpdated);
    expect(mockExpenseService.update).toHaveBeenCalledWith(3, dtoUpdate);
  });

  it("should delete a expense", async () => {
    const expenseMock = {
      expenseId: 1,
      trip: { connect: { tripId: 1 } },
      expenseAmount: 213,
      expenseDescription: "Test Value",
    };

    mockExpenseService.remove.mockResolvedValue(expenseMock);

    const result = await controller.remove(1);

    expect(result).toEqual(expenseMock);
    expect(mockExpenseService.remove).toHaveBeenCalled();
    expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
  });
});
