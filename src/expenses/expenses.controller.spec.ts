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
});
