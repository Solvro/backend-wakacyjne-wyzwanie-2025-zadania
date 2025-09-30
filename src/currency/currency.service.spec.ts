import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CurrencyService } from "./currency.service";

describe("CurrencyService", () => {
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("scraper should work", async () => {
    const result = await service.scrape();
    console.warn(result);
    expect(result).toBe(undefined);
  });
});
