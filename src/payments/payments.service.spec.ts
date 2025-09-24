import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CurrenciesService } from "../currencies/currencies.service";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsService } from "./payments.service";

describe("PaymentsService", () => {
  let service: PaymentsService;

  const mockPrismaService = {
    payment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockCurrenciesService = {
    getCurrencyByCode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CurrenciesService,
          useValue: mockCurrenciesService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
