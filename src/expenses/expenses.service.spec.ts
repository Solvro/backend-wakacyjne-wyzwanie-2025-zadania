import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { createMockPrismaService } from "../test/test-utils";
import type { ExpenseDto } from "./dto/expense.dto";
import { ExpensesService } from "./expenses.service";

describe("ExpensesService", () => {
  let service: ExpensesService;

  // Using the centralized mock instead of inline declaration
  const mockPrismaService = createMockPrismaService();

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

  describe("addExpenseToTrip", () => {
    it("should add an expense to an existing trip with valid participant", async () => {
      const tripId = 1;
      const expenseDto: ExpenseDto = {
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 1,
      };

      const existingTrip = { id: tripId, name: "Test Trip" };
      const existingParticipant = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        tripId,
      };
      const createdExpense = {
        id: 1,
        title: expenseDto.title,
        description: expenseDto.description,
        amount: expenseDto.amount,
        category: expenseDto.category,
        date: new Date(expenseDto.date),
        tripId,
        participantId: expenseDto.participantId,
        participant: {
          name: "John Doe",
          email: "john@example.com",
        },
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.participant.findFirst.mockResolvedValue(
        existingParticipant,
      );
      mockPrismaService.expense.create.mockResolvedValue(createdExpense);

      const result = await service.addExpenseToTrip(tripId, expenseDto);

      expect(result).toEqual(createdExpense);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: tripId },
      });
      expect(mockPrismaService.participant.findFirst).toHaveBeenCalledWith({
        where: {
          id: expenseDto.participantId,
          tripId,
        },
      });
      expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
        data: {
          title: expenseDto.title,
          description: expenseDto.description,
          amount: expenseDto.amount,
          category: expenseDto.category,
          date: new Date(expenseDto.date),
          tripId,
          participantId: expenseDto.participantId,
        },
        include: {
          participant: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it("should throw NotFoundException when trip does not exist", async () => {
      const tripId = 999;
      const expenseDto: ExpenseDto = {
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 1,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(
        service.addExpenseToTrip(tripId, expenseDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.addExpenseToTrip(tripId, expenseDto),
      ).rejects.toThrow("Trip with ID 999 not found");
    });

    it("should throw NotFoundException when participant does not belong to trip", async () => {
      const tripId = 1;
      const expenseDto: ExpenseDto = {
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 999,
      };

      const existingTrip = { id: tripId, name: "Test Trip" };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.participant.findFirst.mockResolvedValue(null);

      await expect(
        service.addExpenseToTrip(tripId, expenseDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.addExpenseToTrip(tripId, expenseDto),
      ).rejects.toThrow("Participant with ID 999 not found in trip 1");
    });
  });

  describe("updateExpense", () => {
    it("should update an existing expense", async () => {
      const expenseId = 1;
      const updateExpenseDto: ExpenseDto = {
        title: "Updated Hotel",
        description: "Updated description",
        amount: 30_000,
        category: "ACCOMMODATION",
        date: "2025-07-06",
        participantId: 1,
      };

      const existingExpense = {
        id: expenseId,
        title: "Old Hotel",
        amount: 25_000,
      };
      const updatedExpense = {
        id: expenseId,
        title: updateExpenseDto.title,
        description: updateExpenseDto.description,
        amount: updateExpenseDto.amount,
        category: updateExpenseDto.category,
        date: new Date(updateExpenseDto.date),
        participantId: updateExpenseDto.participantId,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(existingExpense);
      mockPrismaService.expense.update.mockResolvedValue(updatedExpense);

      const result = await service.updateExpense(expenseId, updateExpenseDto);

      expect(result).toEqual(updatedExpense);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: expenseId },
        data: {
          title: updateExpenseDto.title,
          description: updateExpenseDto.description,
          amount: updateExpenseDto.amount,
          category: updateExpenseDto.category,
          date: new Date(updateExpenseDto.date),
          participantId: updateExpenseDto.participantId,
        },
      });
    });

    it("should throw NotFoundException when expense does not exist", async () => {
      const expenseId = 999;
      const updateExpenseDto: ExpenseDto = {
        title: "Updated Hotel",
        description: "Updated description",
        amount: 30_000,
        category: "ACCOMMODATION",
        date: "2025-07-06",
        participantId: 1,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(null);

      await expect(
        service.updateExpense(expenseId, updateExpenseDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.updateExpense(expenseId, updateExpenseDto),
      ).rejects.toThrow("Expense with ID 999 not found");
    });
  });

  describe("deleteExpense", () => {
    it("should delete an existing expense", async () => {
      const expenseId = 1;
      const existingExpense = {
        id: expenseId,
        title: "Hotel accommodation",
        amount: 25_000,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(existingExpense);
      mockPrismaService.expense.delete.mockResolvedValue(existingExpense);

      const result = await service.deleteExpense(expenseId);

      expect(result).toEqual(existingExpense);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
    });

    it("should throw NotFoundException when expense does not exist", async () => {
      const expenseId = 999;

      mockPrismaService.expense.findUnique.mockResolvedValue(null);

      await expect(service.deleteExpense(expenseId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.deleteExpense(expenseId)).rejects.toThrow(
        "Expense with ID 999 not found",
      );
    });
  });
});
