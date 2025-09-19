import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
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
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create an expense successfully", async () => {
      const createExpenseDto: CreateExpenseDto = {
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };
      const expectedExpense = {
        id: 1,
        trip_id: createExpenseDto.trip_id,
        amount: createExpenseDto.amount,
        description: createExpenseDto.description,
        date: createExpenseDto.date,
      };

      mockExpenseService.create.mockResolvedValue(expectedExpense);

      const result = await controller.create(createExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.create).toHaveBeenCalledWith(createExpenseDto);
      expect(mockExpenseService.create).toHaveBeenCalledTimes(1);
    });

    it("should create an expense with minimal data", async () => {
      const createExpenseDto: CreateExpenseDto = {
        trip_id: 1,
        amount: 50,
      };
      const expectedExpense = {
        id: 1,
        trip_id: createExpenseDto.trip_id,
        amount: createExpenseDto.amount,
      };

      mockExpenseService.create.mockResolvedValue(expectedExpense);

      const result = await controller.create(createExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.create).toHaveBeenCalledWith(createExpenseDto);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const expectedExpenses = [
        {
          id: 1,
          trip_id: 1,
          amount: 100.5,
          description: "Hotel",
          date: new Date("2025-07-01T00:00:00.000Z"),
        },
        {
          id: 2,
          trip_id: 1,
          amount: 25.75,
          description: "Dinner",
          date: new Date("2025-07-02T00:00:00.000Z"),
        },
      ];

      mockExpenseService.findAll.mockResolvedValue(expectedExpenses);

      const result = await controller.findAll();

      expect(result).toEqual(expectedExpenses);
      expect(mockExpenseService.findAll).toHaveBeenCalledWith();
      expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no expenses exist", async () => {
      mockExpenseService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return an expense by id", async () => {
      const expenseId = "1";
      const expectedExpense = {
        id: 1,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };

      mockExpenseService.findOne.mockResolvedValue(expectedExpense);

      const result = await controller.findOne(expenseId);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
      expect(mockExpenseService.findOne).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion", async () => {
      const expenseId = "999";
      const expectedExpense = {
        id: 999,
        trip_id: 1,
        amount: 50,
        description: "Test expense",
      };

      mockExpenseService.findOne.mockResolvedValue(expectedExpense);

      const result = await controller.findOne(expenseId);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe("update", () => {
    it("should update an expense successfully", async () => {
      const expenseId = "1";
      const updateExpenseDto: UpdateExpenseDto = {
        amount: 120.75,
        description: "Updated hotel accommodation",
      };
      const expectedExpense = {
        id: 1,
        trip_id: 1,
        amount: 120.75,
        description: "Updated hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };

      mockExpenseService.update.mockResolvedValue(expectedExpense);

      const result = await controller.update(expenseId, updateExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.update).toHaveBeenCalledWith(
        1,
        updateExpenseDto,
      );
      expect(mockExpenseService.update).toHaveBeenCalledTimes(1);
    });

    it("should handle partial updates", async () => {
      const expenseId = "1";
      const updateExpenseDto: UpdateExpenseDto = {
        amount: 150,
      };
      const expectedExpense = {
        id: 1,
        trip_id: 1,
        amount: 150,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };

      mockExpenseService.update.mockResolvedValue(expectedExpense);

      const result = await controller.update(expenseId, updateExpenseDto);

      expect(result).toEqual(expectedExpense);
      expect(mockExpenseService.update).toHaveBeenCalledWith(
        1,
        updateExpenseDto,
      );
    });
  });

  describe("remove", () => {
    it("should delete an expense successfully", async () => {
      const expenseId = "1";
      const deletedExpense = {
        id: 1,
        trip_id: 1,
        amount: 100.5,
        description: "Hotel accommodation",
        date: new Date("2025-07-01T00:00:00.000Z"),
      };

      mockExpenseService.remove.mockResolvedValue(deletedExpense);

      const result = await controller.remove(expenseId);

      expect(result).toEqual(deletedExpense);
      expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
      expect(mockExpenseService.remove).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion for deletion", async () => {
      const expenseId = "999";
      const deletedExpense = {
        id: 999,
        trip_id: 1,
        amount: 50,
        description: "Test expense",
      };

      mockExpenseService.remove.mockResolvedValue(deletedExpense);

      const result = await controller.remove(expenseId);

      expect(result).toEqual(deletedExpense);
      expect(mockExpenseService.remove).toHaveBeenCalledWith(999);
    });
  });
});
