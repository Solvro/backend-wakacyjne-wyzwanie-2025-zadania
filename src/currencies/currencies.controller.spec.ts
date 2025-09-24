import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CurrenciesController } from "./currencies.controller";
import { CurrenciesService } from "./currencies.service";

describe("CurrenciesController", () => {
  let controller: CurrenciesController;

  const mockCurrenciesService = {
    getAllCurrencies: jest.fn(),
    getCurrencyByCode: jest.fn(),
    forceScrape: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        {
          provide: CurrenciesService,
          useValue: mockCurrenciesService,
        },
      ],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
