import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../src/database/database.module";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
