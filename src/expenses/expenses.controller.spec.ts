import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

describe("ExpensesController", () => {
  let controller: ExpensesController;

  const mockExpensesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: mockExpensesService,
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new expense", async () => {
      const createExpenseDto = {
        price: 100,
        user_id: 1,
        trip_id: 1,
      };
      const mockCreatedExpense = {
        id: 1,
        ...createExpenseDto,
      };
      mockExpensesService.create.mockResolvedValue(mockCreatedExpense);

      const result = await controller.create(createExpenseDto);

      expect(result).toEqual(mockCreatedExpense);
      expect(mockExpensesService.create).toHaveBeenCalledWith(createExpenseDto);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const mockExpenses = [
        { id: 1, price: 100, user_id: 1, trip_id: 1 },
        { id: 2, price: 200, user_id: 2, trip_id: 1 },
      ];
      mockExpensesService.findAll.mockResolvedValue(mockExpenses);

      const result = await controller.findAll();

      expect(result).toEqual(mockExpenses);
      expect(mockExpensesService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return an expense by id", async () => {
      const mockExpense = {
        id: 1,
        price: 100,
        user_id: 1,
        trip_id: 1,
      };
      mockExpensesService.findOne.mockResolvedValue(mockExpense);

      const result = await controller.findOne("1");

      expect(result).toEqual(mockExpense);
      expect(mockExpensesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update an expense", async () => {
      const updateData = { price: 150 };
      const mockUpdatedExpense = {
        id: 1,
        price: 150,
        user_id: 1,
        trip_id: 1,
      };
      mockExpensesService.update.mockResolvedValue(mockUpdatedExpense);

      const result = await controller.update("1", updateData);

      expect(result).toEqual(mockUpdatedExpense);
      expect(mockExpensesService.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe("remove", () => {
    it("should delete an expense", async () => {
      const mockDeletedExpense = { id: 1 };
      mockExpensesService.remove.mockResolvedValue(mockDeletedExpense);

      const result = await controller.remove("1");

      expect(result).toEqual(mockDeletedExpense);
      expect(mockExpensesService.remove).toHaveBeenCalledWith(1);
    });
  });
});
