import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PaymentService } from "./payment.service";

describe.skip("PaymentsService", () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
