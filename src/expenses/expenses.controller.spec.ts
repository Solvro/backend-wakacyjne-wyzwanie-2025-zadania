import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import {
  createMockExpensesService,
  createMockTripsService,
} from "../test/test-utils";
import { TripsService } from "../trips/trips.service";
import type { ExpenseDto } from "./dto/expense.dto";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

describe("ExpensesController", () => {
  let controller: ExpensesController;

  // Using centralized mocks instead of inline declarations
  const mockExpensesService = createMockExpensesService();
  const mockTripsService = createMockTripsService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: mockExpensesService,
        },
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTripExpenses", () => {
    it("should delegate to TripsService.getTripExpenses", async () => {
      const tripId = 1;
      await controller.getTripExpenses(tripId);
      expect(mockTripsService.getTripExpenses).toHaveBeenCalledWith(tripId);
    });
  });

  describe("addExpense", () => {
    it("should delegate to ExpensesService.addExpenseToTrip", async () => {
      const tripId = 1;
      const expenseDto: ExpenseDto = {
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 1,
      };

      await controller.addExpense(tripId, expenseDto);
      expect(mockExpensesService.addExpenseToTrip).toHaveBeenCalledWith(
        tripId,
        expenseDto,
      );
    });
  });

  describe("updateExpense", () => {
    it("should delegate to ExpensesService.updateExpense", async () => {
      const expenseId = 1;
      const updateExpenseDto: ExpenseDto = {
        title: "Updated Hotel",
        description: "Updated description",
        amount: 30_000,
        category: "ACCOMMODATION",
        date: "2025-07-06",
        participantId: 1,
      };

      await controller.updateExpense(expenseId, updateExpenseDto);
      expect(mockExpensesService.updateExpense).toHaveBeenCalledWith(
        expenseId,
        updateExpenseDto,
      );
    });
  });

  describe("deleteExpense", () => {
    it("should delegate to ExpensesService.deleteExpense", async () => {
      const expenseId = 1;
      await controller.deleteExpense(expenseId);
      expect(mockExpensesService.deleteExpense).toHaveBeenCalledWith(expenseId);
    });
  });

  // Exception handling tests
  describe("Exception Handling", () => {
    describe("getTripExpenses", () => {
      it("should throw NotFoundException when trip does not exist", async () => {
        const tripId = 999;
        const notFoundError = new NotFoundException(
          `Trip with ID ${String(tripId)} not found`,
        );
        mockTripsService.getTripExpenses.mockRejectedValue(notFoundError);

        await expect(controller.getTripExpenses(tripId)).rejects.toThrow(
          NotFoundException,
        );
        await expect(controller.getTripExpenses(tripId)).rejects.toThrow(
          `Trip with ID ${String(tripId)} not found`,
        );
      });
    });

    describe("addExpense", () => {
      const validExpenseDto: ExpenseDto = {
        title: "Hotel accommodation",
        description: "3 nights at Grand Hotel",
        amount: 25_000,
        category: "ACCOMMODATION",
        date: "2025-07-05",
        participantId: 1,
      };

      it("should throw NotFoundException when trip does not exist", async () => {
        const tripId = 999;
        const notFoundError = new NotFoundException(
          `Trip with ID ${String(tripId)} not found`,
        );
        mockExpensesService.addExpenseToTrip.mockRejectedValue(notFoundError);

        await expect(
          controller.addExpense(tripId, validExpenseDto),
        ).rejects.toThrow(NotFoundException);
        await expect(
          controller.addExpense(tripId, validExpenseDto),
        ).rejects.toThrow(`Trip with ID ${String(tripId)} not found`);
      });

      it("should throw NotFoundException when participant does not exist in trip", async () => {
        const tripId = 1;
        const participantId = 999;
        const expenseDto: ExpenseDto = {
          title: validExpenseDto.title,
          description: validExpenseDto.description,
          amount: validExpenseDto.amount,
          category: validExpenseDto.category,
          date: validExpenseDto.date,
          participantId,
        };
        const notFoundError = new NotFoundException(
          `Participant with ID ${String(participantId)} not found in trip ${String(tripId)}`,
        );
        mockExpensesService.addExpenseToTrip.mockRejectedValue(notFoundError);

        await expect(controller.addExpense(tripId, expenseDto)).rejects.toThrow(
          NotFoundException,
        );
        await expect(controller.addExpense(tripId, expenseDto)).rejects.toThrow(
          `Participant with ID ${String(participantId)} not found in trip ${String(tripId)}`,
        );
      });
    });

    describe("updateExpense", () => {
      const validUpdateDto: ExpenseDto = {
        title: "Updated Hotel",
        description: "Updated description",
        amount: 30_000,
        category: "ACCOMMODATION",
        date: "2025-07-06",
        participantId: 1,
      };

      it("should throw NotFoundException when expense does not exist", async () => {
        const expenseId = 999;
        const notFoundError = new NotFoundException(
          `Expense with ID ${String(expenseId)} not found`,
        );
        mockExpensesService.updateExpense.mockRejectedValue(notFoundError);

        await expect(
          controller.updateExpense(expenseId, validUpdateDto),
        ).rejects.toThrow(NotFoundException);
        await expect(
          controller.updateExpense(expenseId, validUpdateDto),
        ).rejects.toThrow(`Expense with ID ${String(expenseId)} not found`);
      });
    });

    describe("deleteExpense", () => {
      it("should throw NotFoundException when expense does not exist", async () => {
        const expenseId = 999;
        const notFoundError = new NotFoundException(
          `Expense with ID ${String(expenseId)} not found`,
        );
        mockExpensesService.deleteExpense.mockRejectedValue(notFoundError);

        await expect(controller.deleteExpense(expenseId)).rejects.toThrow(
          NotFoundException,
        );
        await expect(controller.deleteExpense(expenseId)).rejects.toThrow(
          `Expense with ID ${String(expenseId)} not found`,
        );
      });
    });
  });
});
