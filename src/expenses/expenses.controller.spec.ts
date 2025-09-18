import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

describe("ExpensesController", () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
