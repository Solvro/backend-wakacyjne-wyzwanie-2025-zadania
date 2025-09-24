import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { CurrenciesService } from "./currencies.service";

describe("CurrenciesService", () => {
  let service: CurrenciesService;

  const mockPrismaService = {
    currency: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
