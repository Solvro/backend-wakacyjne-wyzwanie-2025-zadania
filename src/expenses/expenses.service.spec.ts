import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ExpensesService } from "./expenses.service";

describe("ExpensesService", () => {
  let service: ExpensesService;

  const mockPrismaService = {
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
      providers: [
        ExpensesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
      mockPrismaService.expense.create.mockResolvedValue(mockCreatedExpense);

      const result = await service.create(createExpenseDto);

      expect(result).toEqual(mockCreatedExpense);
      expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
        data: createExpenseDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const mockExpenses = [
        { id: 1, price: 100, user_id: 1, trip_id: 1 },
        { id: 2, price: 200, user_id: 2, trip_id: 1 },
      ];
      mockPrismaService.expense.findMany.mockResolvedValue(mockExpenses);

      const result = await service.findAll();

      expect(result).toEqual(mockExpenses);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledTimes(1);
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
      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);

      const result = await service.findOne(1);

      expect(result).toEqual(mockExpense);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
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
      mockPrismaService.expense.update.mockResolvedValue(mockUpdatedExpense);

      const result = await service.update(1, updateData);

      expect(result).toEqual(mockUpdatedExpense);
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe("remove", () => {
    it("should delete an expense", async () => {
      const mockDeletedExpense = { id: 1 };
      mockPrismaService.expense.delete.mockResolvedValue(mockDeletedExpense);

      const result = await service.remove(1);

      expect(result).toEqual(mockDeletedExpense);
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
