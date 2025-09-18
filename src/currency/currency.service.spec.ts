import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { CurrencyService } from "./currency.service";

// Mock PrismaService
const mockPrismaService = {
  currencyRate: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe("CurrencyService", () => {
  let service: CurrencyService;
  let _database: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: DatabaseService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    _database = module.get<DatabaseService>(DatabaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
