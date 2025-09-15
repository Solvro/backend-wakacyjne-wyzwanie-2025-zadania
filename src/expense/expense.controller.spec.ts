/* eslint-disable @typescript-eslint/no-misused-spread */
import { Type as ExpenseType } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    findAll: jest.fn(() => [
      { id: 1, description: "Mock expense 1", cost: 10 },
      { id: 2, description: "Mock expense 2", cost: 20 },
    ]),
    findOne: jest.fn((id: number) => ({
      id,
      description: "Mock expense",
      cost: 30,
    })),
    create: jest.fn((dto: CreateExpenseDto) => ({
      id: Date.now(),
      ...dto,
    })),
    update: jest.fn((id: number, dto: Partial<CreateExpenseDto>) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => ({
      id,
    })),
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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all expenses", async () => {
    const result = await controller.findAll();

    expect(result).toHaveLength(2);
    expect(result[0].description).toBe("Mock expense 1");
    expect(mockExpenseService.findAll).toHaveBeenCalled();
  });

  it("should return one expense by id", async () => {
    const result = await controller.findOne("1");

    expect(result).toHaveProperty("id", 1);
    expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
  });

  it("should create an expense", async () => {
    const dto: CreateExpenseDto = {
      description: "Lunch near Colosseum",
      cost: 35.5,
      type: ExpenseType.FOOD,
      tripId: 1,
      payerId: 2,
    };

    const result = await controller.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.description).toBe("Lunch near Colosseum");
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it("should update an expense", async () => {
    const dto = { cost: 50 };

    const result = await controller.update("1", dto);

    expect(result).toEqual({ id: 1, cost: 50 });
    expect(mockExpenseService.update).toHaveBeenCalledWith(1, dto);
  });

  it("should delete an expense", async () => {
    const result = await controller.remove("1");

    expect(result).toEqual({ id: 1 });
    expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
  });
});
