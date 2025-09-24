import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

describe("PaymentsController", () => {
  let controller: PaymentsController;

  const mockPaymentsService = {
    createPayment: jest.fn(),
    getAllPayments: jest.fn(),
    getPaymentById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
