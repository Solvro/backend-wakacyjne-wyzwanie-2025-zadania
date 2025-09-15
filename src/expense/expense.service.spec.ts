import { ExpenseCategory } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseService } from "./expense.service";

const mockDatabaseService = {
  expense: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("ExpenseService", () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create an expense", async () => {
      const createExpenseDto: CreateExpenseDto = {
        title: "Spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        recipientName: "Teatr Polski, Wrocław",
        recipientIban: "161234567891234678913456",
        quantity: 7,
        currency: "PLN",
        amount: new Decimal(1200),
        budgetLeft: new Decimal(800),
        note: "Najlepiej oceniany spektakl",
        participantId: 1,
        tripId: 1,
      };
      const expectedExpense = {
        id: 1,
        title: createExpenseDto.title,
        category: createExpenseDto.category,
        recipientName: createExpenseDto.recipientName,
        recipientIban: createExpenseDto.recipientIban,
        quantity: createExpenseDto.quantity,
        currency: createExpenseDto.currency,
        amount: 1200,
        budgetLeft: 800,
        note: createExpenseDto.note,
        participantId: createExpenseDto.participantId,
        tripId: createExpenseDto.tripId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };
      mockDatabaseService.expense.create.mockResolvedValue({
        id: 1,
        title: createExpenseDto.title,
        category: createExpenseDto.category,
        recipientName: createExpenseDto.recipientName,
        recipientIban: createExpenseDto.recipientIban,
        quantity: createExpenseDto.quantity,
        currency: createExpenseDto.currency,
        amount: new Decimal(1200),
        budgetLeft: new Decimal(800),
        note: createExpenseDto.note,
        participantId: createExpenseDto.participantId,
        tripId: createExpenseDto.tripId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      });
      const result = await service.create(createExpenseDto);
      expect(mockDatabaseService.expense.create).toHaveBeenCalledWith({
        data: createExpenseDto,
      });
      expect(result).toEqual(expectedExpense);
    });
  });

  describe("findAll", () => {
    it("should return an array of expenses", async () => {
      const expectedExpenses = [
        {
          id: 1,
          title: "Spektakl w teatrze",
          category: ExpenseCategory.ENTERTAINMENT,
          currency: "PLN",
          amount: 1200,
          budgetLeft: 800,
          createdAt: new Date(),
          updatedAt: new Date(),
          isArchived: false,
        },
        {
          id: 2,
          title: "Bilety lotnicze",
          category: ExpenseCategory.TRANSPORT,
          currency: "PLN",
          amount: 1600,
          budgetLeft: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          isArchived: false,
        },
      ];
      mockDatabaseService.expense.findMany.mockResolvedValue([
        {
          id: 1,
          title: "Spektakl w teatrze",
          category: ExpenseCategory.ENTERTAINMENT,
          currency: "PLN",
          amount: new Decimal(1200),
          budgetLeft: new Decimal(800),
          createdAt: new Date(),
          updatedAt: new Date(),
          isArchived: false,
        },
        {
          id: 2,
          title: "Bilety lotnicze",
          category: ExpenseCategory.TRANSPORT,
          currency: "PLN",
          amount: new Decimal(1600),
          budgetLeft: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          isArchived: false,
        },
      ]);
      const result = await service.findAll();
      expect(mockDatabaseService.expense.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: undefined,
        skip: undefined,
        take: undefined,
      });
      expect(result).toEqual(expectedExpenses);
    });
  });

  describe("findOne", () => {
    it("should return an expense by id", async () => {
      const expectedExpense = {
        id: 1,
        title: "Spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: 1200,
        budgetLeft: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };
      mockDatabaseService.expense.findUnique.mockResolvedValue({
        id: 1,
        title: "Spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: new Decimal(1200),
        budgetLeft: new Decimal(800),
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      });
      const result = await service.findOne(1);
      expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(expectedExpense);
    });

    it("should throw NotFoundException if expense not found", async () => {
      mockDatabaseService.expense.findUnique.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(
        "Expense with id 999 not found",
      );
      expect(mockDatabaseService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe("update", () => {
    it("should update an expense", async () => {
      const updateExpenseDto: UpdateExpenseDto = {
        title: "Zaktualizowany spektakl w teatrze",
        amount: new Decimal(1600),
        updatedAt: new Date().toString(),
        isArchived: false,
      };
      const expectedExpense = {
        id: 1,
        title: "Zaktualizowany spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: 1600,
        budgetLeft: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };
      mockDatabaseService.expense.update.mockResolvedValue({
        id: 1,
        title: "Zaktualizowany spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: new Decimal(1600),
        budgetLeft: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      });
      const result = await service.update(1, updateExpenseDto);
      expect(mockDatabaseService.expense.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateExpenseDto,
      });
      expect(result).toEqual(expectedExpense);
    });
  });

  describe("remove", () => {
    it("should delete an expense", async () => {
      const expectedExpense = {
        id: 1,
        title: "Spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: 1200,
        budgetLeft: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };
      mockDatabaseService.expense.delete.mockResolvedValue({
        id: 1,
        title: "Spektakl w teatrze",
        category: ExpenseCategory.ENTERTAINMENT,
        currency: "PLN",
        amount: new Decimal(1200),
        budgetLeft: new Decimal(800),
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      });
      const result = await service.remove(1);
      expect(mockDatabaseService.expense.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(expectedExpense);
    });
  });
});
