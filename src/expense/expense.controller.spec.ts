import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

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
      providers: [{ provide: ExpenseService, useValue: mockExpenseService }],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
