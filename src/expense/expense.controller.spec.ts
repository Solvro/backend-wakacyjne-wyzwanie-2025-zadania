import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import type { CreateExpenseResponseDto } from "./dto/create-expense-response.dto";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn((dto: CreateExpenseDto): CreateExpenseResponseDto => {
      return {
        id: Date.now(),
        name: dto.name,
        description: dto.description,
        value: dto.value,
        trip_id: dto.trip_id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),

    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(
      (id: number, dto: UpdateExpenseDto): CreateExpenseResponseDto => {
        return {
          id,
          name: dto.name ?? "Default Name",
          description: dto.description,
          value: dto.value ?? 0,
          trip_id: dto.trip_id ?? 1,
          created_at: new Date(),
          updated_at: new Date(),
        };
      },
    ),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: mockExpenseService,
        },
        {
          provide: AuthService,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create an expense", async () => {
    const dto: CreateExpenseDto = {
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
    };

    const result = await controller.create(dto);
    expect(result).toHaveProperty("id");
    expect(result.name).toBe(dto.name);
    expect(result.description).toBe(dto.description);
    expect(result.value).toBe(dto.value);
    expect(result.trip_id).toBe(dto.trip_id);
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
    expect(mockExpenseService.create).toHaveBeenCalledTimes(1);
  });

  it("should get all expenses", async () => {
    const expenses = [
      {
        id: 1,
        name: "Lunch",
        description: "Lunch with friends",
        value: 20,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Dinner",
        description: "Dinner with family",
        value: 40,
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    mockExpenseService.findAll.mockResolvedValue(expenses);
    const result = await controller.findAll();
    expect(result).toBe(expenses);
    expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should get one expense", async () => {
    const expense = {
      id: 1,
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockExpenseService.findOne.mockResolvedValue(expense);
    const result = await controller.findOne("1");
    expect(result).toBe(expense);
    expect(mockExpenseService.findOne).toHaveBeenCalledTimes(1);
  });
  it("should update an expense", async () => {
    const dto = {
      name: "Brunch",
      description: "Brunch with friends",
      value: 25,
      trip_id: 1,
    };

    const result = await controller.update("1", dto);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe(dto.name);
    expect(result.description).toBe(dto.description);
    expect(result.value).toBe(dto.value);
    expect(result.trip_id).toBe(dto.trip_id);
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
  });

  it("should delete an expense", async () => {
    const mockExpense: CreateExpenseResponseDto = {
      id: 1,
      name: "Lunch",
      description: "Lunch with friends",
      value: 20,
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockExpenseService.remove.mockResolvedValue(mockExpense);

    const result = await controller.remove("1");
    expect(result).toBe(mockExpense);
    expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
    expect(mockExpenseService.remove).toHaveBeenCalledTimes(1);
  });
});
