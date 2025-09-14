import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;

  const mockDatabaseService = {
    expense: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto = {
      amount: 123,
      description: "oplata",
      createdAt: new Date(2025, 8, 14, 12, 30, 0),
      tripId: 1,
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.amount).toBe(dto.amount);
    expect(result.description).toBe(dto.description);
    expect(result.createdAt).toEqual(dto.createdAt);
    expect(result.tripId).toBe(dto.tripId);

    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: dto,
    });

    const created = await service.create(dto);
    expect(created).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      ...dto,
    });
  });

  it("should find all expences", async () => {
    const mockExpenses = [
      {
        id: 1,
        amount: 100,
        description: "Lunch",
        createdAt: new Date(),
        tripId: 1,
      },
      {
        id: 2,
        amount: 200,
        description: "Taxi",
        createdAt: new Date(),
        tripId: 1,
      },
    ];
    mockDatabaseService.expense.findMany.mockResolvedValue(mockExpenses);

    const result = await service.findAll();

    expect(result).toEqual(mockExpenses);
    expect(mockDatabaseService.expense.findMany).toHaveBeenCalled();
  });

  it("should find expence by id", async () => {
    const mockExpenses = {
      id: 1,
      amount: 200,
      description: "Taxi",
      createdAt: new Date(),
      tripId: 1,
    };
    mockDatabaseService.expense.findUnique.mockResolvedValue(mockExpenses);

    const result = await service.findOne(1);

    expect(result).toEqual(mockExpenses);
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalled();
  });

  it("should update user", async () => {
    const mockExpenses = {
      id: 1,
      amount: 200,
      description: "Taxi",
      createdAt: new Date(),
      tripId: 1,
    };

    mockDatabaseService.expense.update.mockImplementation((arguments_) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { ...mockExpenses, ...arguments_.data };
    });

    const result = await service.update(1, { amount: 300 });

    expect(result.amount).toBe(300);
    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { amount: 300 },
    });
  });

  it("should delete user", async () => {
    const mockExpenses = {
      id: 1,
      amount: 200,
      description: "Taxi",
      createdAt: new Date(),
      tripId: 1,
    };
    mockDatabaseService.expense.delete.mockResolvedValue(mockExpenses);

    const result = await service.remove(1);

    expect(result).toEqual(mockExpenses);

    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
