import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

describe.skip("CurrencyController", () => {
  let controller: CurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [CurrencyService],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
