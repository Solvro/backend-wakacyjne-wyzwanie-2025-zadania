import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let database: DatabaseService;

  const mockDatabaseService = {
    expense: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
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
    expect(database).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto = {
      amount: 123.45,
      tripParticipantId: 3,
    };

    mockDatabaseService.expense.create.mockResolvedValue({ undefined });

    await service.create(dto);

    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: {
        amount: dto.amount,
        tripParticipantId: dto.tripParticipantId,
      },
    });
  });

  // Find all
  it("should find all expenses", async () => {
    const mockExpenses = [
      { id: 1, amount: 100.5, tripParticipantId: 1 },
      { id: 2, amount: 200.5, tripParticipantId: 2 },
    ];
    mockDatabaseService.expense.findMany.mockResolvedValue(mockExpenses);

    const expenses = await service.findAll();

    expect(mockDatabaseService.expense.findMany).toHaveBeenCalled();
    expect(expenses).toEqual(mockExpenses);
  });

  // Find one
  it("should find one expense by id", async () => {
    const mockExpense = { id: 1, amount: 100.5, tripParticipantId: 1 };
    mockDatabaseService.expense.findUnique.mockResolvedValue(mockExpense);

    const expense = await service.findOne(1);

    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(expense).toEqual(mockExpense);
  });

  // Update
  it("should update an expense", async () => {
    const dto = {
      amount: 150.75,
      tripParticipantId: 2,
    };

    mockDatabaseService.expense.update.mockResolvedValue({ undefined });

    await service.update(1, dto);

    expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        amount: dto.amount,
        tripParticipantId: dto.tripParticipantId,
      },
    });
  });

  // Remove
  it("should remove an expense", async () => {
    mockDatabaseService.expense.delete.mockResolvedValue({ undefined });

    await service.remove(1);

    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
