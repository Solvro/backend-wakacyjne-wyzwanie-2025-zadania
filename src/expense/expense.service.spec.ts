/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Expense, Trip } from "@prisma/client";
import { Type as ExpenseType, Prisma } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import { ExpenseService } from "./expense.service";

const mockDatabaseService = {
  expense: {
    findOne: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(({ data }: { data: Partial<Expense> }) => ({
      id: Date.now(),
      ...data,
      cost: new Prisma.Decimal(data.cost ?? 0).toNumber(),
    })),
    update: jest.fn(
      ({ where, data }: { where: { id: number }; data: Partial<Expense> }) => ({
        id: where.id,
        ...data,
      }),
    ),
    delete: jest.fn(({ where }: { where: { id: number } }) => ({
      id: where.id,
    })),
  },
  trip: {
    findUnique: jest.fn(({ where }: { where: { id: number } }): Trip | null =>
      where.id === 1
        ? ({
            id: 1,
            name: "Mock Trip",
            startDate: new Date(),
            endDate: new Date(),
            budget: new Prisma.Decimal(100),
            coordinatorEmail: "mock@test.com",
            destination: null,
            createdAt: new Date(),
          } as Trip)
        : null,
    ),
    count: jest.fn(
      ({ where }: { where: { id: number; participants?: unknown } }) =>
        where.id === 1 ? 1 : 0,
    ),
  },
};

describe("ExpenseService", () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto: CreateExpenseDto = {
      description: "Lunch near Colosseum",
      cost: 35.5,
      type: ExpenseType.FOOD,
      tripId: 1,
      payerId: 2,
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.description).toBe("Lunch near Colosseum");
    expect(result.cost).toBe(35.5);
    expect(result.type).toBe(ExpenseType.FOOD);
    expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        description: "Lunch near Colosseum",
        type: ExpenseType.FOOD,
        tripId: 1,
        payerId: 2,
        cost: expect.anything(), // Don't care about the exact type/format of cost
      }),
    });
  });

  // it("should update an expense", async () => {
  //   const dto = { cost: 40 };
  //   const result = await service.update(1, dto);

  //   expect(result).toEqual({ id: 1, cost: 40 });
  //   expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
  //     where: { id: 1 },
  //     data: dto,
  //   });
  // });

  // it("should delete an expense", async () => {
  //   const result = await service.remove(1);

  //   expect(result).toEqual({ id: 1 });
  //   expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
  //     where: { id: 1 },
  //   });
  // });
});
