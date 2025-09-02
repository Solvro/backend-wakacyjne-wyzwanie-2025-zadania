import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService, PrismaService],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
