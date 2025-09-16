import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validExpense } from "../../test/test-utils";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new expense", async () => {
    const dto: CreateExpenseDto = validExpense();

    const expected = {
      id: 1,
      ...validExpense(),
    };

    mockExpenseService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(result).toEqual(expected);
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
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

    mockExpenseService.findAll.mockResolvedValue(mockExpenses);

    const result = await controller.findAll();

    expect(result).toEqual(mockExpenses);
    expect(result.length).toEqual(mockExpenses.length);
  });

  it("should return a single expense with given id", async () => {
    const expected = {
      id: 5,
      ...validExpense(),
    };

    mockExpenseService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne("5");

    expect(result).toEqual(expected);
    expect(mockExpenseService.findOne).toHaveBeenCalledWith(5);
  });

  it("should update an expense", async () => {
    const expected = {
      id: 3,
      ...validExpense(),
    };

    mockExpenseService.update.mockResolvedValue(expected);

    const result = await controller.update("3", { name: "testExpense" });

    expect(result).toEqual(expected);
    expect(mockExpenseService.update).toHaveBeenCalledWith(3, {
      name: "testExpense",
    });
  });

  it("should delete an expense", async () => {
    const expected = {
      id: 1,
      ...validExpense(),
    };

    mockExpenseService.remove.mockResolvedValue(expected);

    const result = await controller.remove("1");

    expect(result).toEqual(expected);
    expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
  });
});
