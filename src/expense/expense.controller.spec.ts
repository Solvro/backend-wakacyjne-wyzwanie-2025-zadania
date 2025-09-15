import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { ExpenseType } from "@prisma/client";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

describe("ExpenseController", () => {
  let controller: ExpenseController;
  let service: ExpenseService;

  const mockExpenseService = {
    create: jest.fn((dto: CreateExpenseDto) => ({
      expense_id: 1,
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        expense_id: 1,
        trip_id: 1,
        expense_type: ExpenseType.ACCOMMODATION,
        cost: 500,
        description: "Hotel",
        expense_date: new Date("2025-09-01"),
      },
      {
        expense_id: 2,
        trip_id: 1,
        expense_type: ExpenseType.FOOD,
        cost: 200,
        description: "Lunch",
        expense_date: new Date("2025-09-02"),
      },
    ]),
    findOne: jest.fn((id: number) => {
      if (id === 1) {
        return {
          expense_id: 1,
          trip_id: 1,
          expense_type: ExpenseType.ACCOMMODATION,
          cost: 500,
          description: "Hotel",
          expense_date: new Date("2025-09-01"),
        };
      }
      throw new NotFoundException();
    }),
    update: jest.fn((id: number, dto: UpdateExpenseDto) => ({
      expense_id: id,
      ...dto,
    })),
    remove: jest.fn((id: number) => {
      if (id !== 1) throw new NotFoundException();
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: mockExpenseService,
        },
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create an expense", async () => {
      const dto: CreateExpenseDto = {
        trip_id: 1,
        expense_type: ExpenseType.FOOD,
        cost: 300,
        description: "Lunch",
        expense_date: new Date("2025-09-01"),
      };

      expect(await controller.create(dto)).toEqual({
        expense_id: 1,
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return one expense", async () => {
      const result = await controller.findOne(1);
      expect(result.expense_id).toBe(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if expense not found", async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update an expense", async () => {
      const dto: UpdateExpenseDto = {
        description: "Updated hotel",
        cost: 600,
      };
      const result = await controller.update(1, dto);
      expect(result).toEqual({ expense_id: 1, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove an expense", async () => {
      await expect(controller.remove(1)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if expense not found", async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
