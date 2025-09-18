import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

const mockCurrencyService = {
  getLatestRate: jest.fn().mockResolvedValue(4.23),
  create: jest.fn().mockResolvedValue({ id: 1, name: "USD", value: 4.23 }),
  findAll: jest.fn().mockResolvedValue([{ id: 1, name: "USD", value: 4.23 }]),
};

describe("CurrencyController", () => {
  let controller: CurrencyController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: mockCurrencyService, // ✅ Używamy mocka
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CurrencyController>(CurrencyController);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
