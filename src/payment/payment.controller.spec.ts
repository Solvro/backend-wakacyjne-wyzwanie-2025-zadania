import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

describe.skip("PaymentsController", () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
