import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { CurrencyService } from "./currency.service";

describe("CurrencyService", () => {
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService, PrismaService],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
