import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  interface Expense {
    id: number;
    description: string;
    amount: number;
    currency: string;
    date: Date;
    participant_id: number;
    trip_id: number;
  }

  let expenseCounter = 1;
  let expensesInMemory: Expense[] = [];

  const initialExpenses: Expense[] = [
    {
      id: 1,
      description: "Hotel",
      amount: 120,
      currency: "EUR",
      date: new Date("2023-01-01"),
      participant_id: 1,
      trip_id: 1,
    },
    {
      id: 2,
      description: "Taxi",
      amount: 30,
      currency: "EUR",
      date: new Date("2023-01-02"),
      participant_id: 2,
      trip_id: 1,
    },
  ];

  const mockExpenseService = {
    create: jest.fn(({ data }: { data: Expense }) => {
      const newExpense: Expense = { id: expenseCounter++, ...data };
      expensesInMemory.push(newExpense);
      return newExpense;
    }) as jest.Mock,
    getAll: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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

  it("should create an expense", async () => {
    const dto = {
      description: "Lunch",
      amount: 50,
      currency: "USD",
      date: new Date(),
      participant_id: 1,
      trip_id: 1,
    };

    const expectedValue: Expense = { id: expenseCounter, ...dto };
    mockExpenseService.create.mockResolvedValue(expectedValue);

    const result = await controller.post(dto);

    expect(result).toEqual(expectedValue);
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all expenses", async () => {
    mockExpenseService.getAll.mockResolvedValue(expensesInMemory);

    const result = await controller.getAll();

    expect(result).toEqual(expensesInMemory);
    expect(mockExpenseService.getAll).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock = initialExpenses[0];

    mockExpenseService.getOne.mockResolvedValue(expenseMock);
    const result = await controller.getOne("1");

    expect(result).toEqual(expenseMock);
    expect(mockExpenseService.getOne).toHaveBeenCalledWith(1);
  });

  it("should update an expense", async () => {
    const dto = {
      description: "Dinner",
      amount: 80,
      currency: "EUR",
      date: new Date(),
      participant_id: 1,
      trip_id: 1,
    };
    const expenseMock = await controller.post(dto); // np. id == 3

    const dtoUpdate = { amount: 200 };
    const expenseUpdated: Expense = { ...expenseMock, ...dtoUpdate };

    mockExpenseService.update.mockResolvedValue(expenseUpdated);

    const result = await controller.update(String(expenseMock.id), dtoUpdate);

    expect(mockExpenseService.update).toHaveBeenCalledWith(
      expenseMock.id,
      dtoUpdate,
    );
    expect(result).toEqual(expenseUpdated);
  });

  it("should delete an expense", async () => {
    const expenseMock = initialExpenses[0];

    await controller.delete(String(expenseMock.id));

    expect(mockExpenseService.delete).toHaveBeenCalledWith(expenseMock.id);
  });
});
