import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CurrencyService } from "../currency/currency.service";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

describe("PaymentsController", () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [CurrencyService, PrismaService, PaymentsService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
