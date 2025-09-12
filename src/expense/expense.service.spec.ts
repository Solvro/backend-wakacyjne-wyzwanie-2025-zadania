import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  let _prisma: PrismaService;

  const mockPrismaService = {
    expense: {
      create: jest.fn(
        ({
          data,
        }: {
          data: Omit<
            CreateExpenseResponseDto,
            "id" | "created_at" | "updated_at"
          >;
        }) =>
          ({
            id: Date.now(),
            created_at: new Date(),
            updated_at: new Date(),
            ...data,
          }) as CreateExpenseResponseDto,
      ),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<ExpenseService>(ExpenseService);
    _prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto = {
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
    };
    const expense = await service.create(dto);

    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("created_at");
    expect(expense).toHaveProperty("updated_at");
    expect(expense).toHaveProperty("name");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("value");
    expect(expense).toHaveProperty("trip_id");
    expect(expense.name).toBe(dto.name);
    expect(expense.description).toBe(dto.description);
    expect(expense.value).toBe(dto.value);
    expect(expense.trip_id).toBe(dto.trip_id);
    expect(expense.created_at).toBeInstanceOf(Date);
    expect(expense.updated_at).toBeInstanceOf(Date);
    const id = expense.id;
    expect(typeof id).toBe("number");
    expect(id).toBeGreaterThan(0);
    expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(mockPrismaService.expense.create).toHaveBeenCalledTimes(1);
  });

  it("should return all expenses", async () => {
    const mockexpense = [
      {
        id: 1,
        name: "Lunch",
        description: "Lunch with friends",
        value: 20,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    mockPrismaService.expense.findMany.mockResolvedValue(mockexpense);
    const result = await service.findAll();
    expect(result).toEqual(mockexpense);
    expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith();
    expect(mockPrismaService.expense.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one expense", async () => {
    const mockexpense = {
      id: 1,
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPrismaService.expense.findUnique.mockResolvedValue(mockexpense);

    const expense = await service.findOne(1);
    expect(expense).toEqual(mockexpense);
    expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockPrismaService.expense.findUnique).toHaveBeenCalledTimes(1);
    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("name");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("value");
    expect(expense).toHaveProperty("trip_id");
    expect(expense).toHaveProperty("created_at");
    expect(expense).toHaveProperty("updated_at");
    expect(expense).toStrictEqual(mockexpense);
  });

  it("should update an expense", async () => {
    const mockexpense = {
      id: 1,
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const dto = {
      name: "Dinner",
      description: "Dinner with friends",
      value: 30,
      trip_id: 1,
    };
    mockPrismaService.expense.update.mockResolvedValue({
      ...mockexpense,
      ...dto,
    });

    const expense = await service.update(1, dto);
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledTimes(1);
    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("name");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("value");
    expect(expense).toHaveProperty("trip_id");
    expect(expense).toHaveProperty("created_at");
    expect(expense).toHaveProperty("updated_at");
    expect(expense).toStrictEqual({ ...mockexpense, ...dto });
  });

  it("should remove an expense", async () => {
    const mockexpense = {
      id: 1,
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPrismaService.expense.delete.mockResolvedValue(mockexpense);

    const expense = await service.remove(1);
    expect(expense).toEqual(mockexpense);
    expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockPrismaService.expense.delete).toHaveBeenCalledTimes(1);
    expect(expense).toHaveProperty("id");
    expect(expense).toHaveProperty("name");
    expect(expense).toHaveProperty("description");
    expect(expense).toHaveProperty("value");
    expect(expense).toHaveProperty("trip_id");
    expect(expense).toHaveProperty("created_at");
    expect(expense).toHaveProperty("updated_at");
    expect(expense).toBe(mockexpense);
  });
});
