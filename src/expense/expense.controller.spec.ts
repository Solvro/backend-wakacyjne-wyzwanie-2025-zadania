import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpensesController } from "./expense.controller";

describe("ExpensesController", () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: DatabaseService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
