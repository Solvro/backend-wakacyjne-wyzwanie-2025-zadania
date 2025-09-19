import { Category, CurrencyName } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import type { PaginationDto } from "src/pagination/pagination.dto";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  });

  it("should create one expense", async () => {
    const dto = {
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      paid: false,
      currency: CurrencyName.USD,
    };

    mockDatabaseService.expense.create.mockResolvedValue({
      expense_id: 1,
      ...dto,
      participant_id: 1,
    });

    const result = await service.create(dto, 1);

    expect(result).toHaveProperty("expense_id", 1);
    expect(result.title).toBe("wydatek");
    expect(await service.create(dto, 1)).toEqual({
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    });
  });

  it("should find one expense by id", async () => {
    const dto = {
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };
    mockDatabaseService.expense.findUnique.mockResolvedValue(dto);

    const result = await service.findOne(1);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("expense_id", 1);
    expect(result.title).toBe("wydatek");
    expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
      where: { expense_id: 1 },
    });
  });

  it("should find all expenses", async () => {
    const dto = {
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };
    const dto2 = {
      expense_id: 2,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };

    mockDatabaseService.expense.findMany.mockResolvedValue([dto, dto2]);

    const paginationDto: PaginationDto = { limit: 10, skip: 0 };
    const result = await service.findAll(paginationDto);

    expect(result).toHaveLength(2);
    expect(result).toEqual([dto, dto2]);
    expect(mockDatabaseService.expense.findMany).toHaveBeenCalled();
  });

  it("should delete record", async () => {
    const dto = {
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };

    mockDatabaseService.expense.delete.mockResolvedValue(dto);

    const result = await service.remove(1);

    expect(result).toHaveProperty("expense_id");
    expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
      where: { expense_id: 1 },
    });
  });

  it("should update an exsisitng record", async () => {
    const dto = {
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      paid: false,
      currency: CurrencyName.USD,
    };

    mockDatabaseService.expense.create.mockResolvedValue(dto);

    const resultCreate = await service.create(dto, 1);

    expect(resultCreate.title).toBe("wydatek");

    const dtoUpdate = {
      title: "wydatek updejt",
    };

    const updatedExpense = { ...dto, ...dtoUpdate };

    mockDatabaseService.expense.update.mockResolvedValue(updatedExpense);

    const result = await service.update(dto.expense_id, dtoUpdate);

    expect(result.title).toBe("wydatek updejt");
  });
});
