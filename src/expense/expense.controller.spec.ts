import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  interface Expense {
    id: number;
    dailyPrice: number;
    discount: boolean;
    tripId: number;
  }

  let expenseCounter = 1;

  const initialExpenses: Expense[] = [
    {
      id: 1,
      dailyPrice: 120,
      discount: false,
      tripId: 1,
    },
    {
      id: 2,
      dailyPrice: 30,
      discount: true,
      tripId: 1,
    },
  ];

  const mockExpenseService = {
    create: jest.fn(({ data }: { data: Expense }) => {
      const newExpense: Expense = {
        id: expenseCounter++,
        dailyPrice: data.dailyPrice,
        discount: data.discount,
        tripId: data.tripId,
      };
      return newExpense;
    }) as jest.Mock,
    getAll: jest.fn().mockResolvedValue(initialExpenses),
    getOne: jest.fn().mockResolvedValue(initialExpenses[0]),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn().mockResolvedValue(initialExpenses),
    findOne: jest.fn().mockResolvedValue(initialExpenses[0]),
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

    expenseCounter = initialExpenses.length + 1;
    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto = {
      dailyPrice: 50,
      discount: false,
      tripId: 1,
    };

    const expectedValue = { id: expenseCounter, ...dto };
    mockExpenseService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all expenses", async () => {
    const result = await controller.findAll();

    expect(result).toEqual(initialExpenses);
    expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const expenseMock = initialExpenses[0];

    const result = await controller.findOne("1");

    expect(result).toEqual(expenseMock);
    expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update an expense", async () => {
    const dto = {
      dailyPrice: 80,
      discount: false,
      tripId: 1,
    };

    const expenseMock = await controller.create(dto);

    const dtoUpdate = { dailyPrice: 200, discount: true };
    const expenseUpdated = { ...expenseMock, ...dtoUpdate };

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

    await controller.remove(String(expenseMock.id));

    expect(mockExpenseService.remove).toHaveBeenCalledWith(expenseMock.id);
  });
});
