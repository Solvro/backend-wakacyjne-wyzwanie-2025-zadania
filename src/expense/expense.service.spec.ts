import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let database: DatabaseService;

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }) => ({
        id: Date.now(),
        ...data,
      })),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<ExpenseService>(ExpenseService);
    database = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const dto = {
      amount: 123,
      description: "oplata",
      createdAt: new Date(2025, 8, 14, 12, 30, 0),
      tripId: 1,
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.amount).toBe(123);
    expect(result.description).toBe("oplata");
    expect(result.createdAt).toBe(new Date(2025, 8, 14, 12, 30, 0));
    expect(result.tripId).toBe(1);
    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(service.create(dto)).toEqual({
      id: expect.any(Number),
      description: "oplata",
      createdAt: new Date(2025, 8, 14, 12, 30, 0),
      tripId: 1,
    });
  });
});
