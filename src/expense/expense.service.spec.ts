import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, PrismaService],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
