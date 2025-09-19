/* eslint-disable @typescript-eslint/unbound-method */
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/role/role.guard";
import type { ExpenseResponseDto } from "./dto/expense-response.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

describe("ExpensesController", () => {
  let controller: ExpensesController;
  let service: jest.Mocked<ExpensesService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const mockRoleGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        { provide: ExpensesService, useValue: mockService },
        { provide: AuthService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<ExpensesController>(ExpensesController);
    service = module.get(ExpensesService);
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const expenses = [{ id: 1 } as ExpenseResponseDto];
      service.findAll.mockResolvedValue(expenses);
      expect(await controller.findAll()).toBe(expenses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return an expense by id", async () => {
      const expense = { id: 1 };
      service.findOne.mockResolvedValue(expense as ExpenseResponseDto);
      expect(await controller.findOne(1)).toBe(expense);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should return null if expense not found", async () => {
      service.findOne.mockResolvedValue(null);
      expect(await controller.findOne(1)).toBeNull();
    });
  });

  describe("update", () => {
    it("should update expense", async () => {
      const dto: UpdateExpenseDto = {
        what: "example",
        description: "example",
        amount: 25.5,
        trip_id: 1,
        user_email: "test@mail.com",
      };
      const expense = { id: 1 };
      service.update.mockResolvedValue(expense as ExpenseResponseDto);
      expect(await controller.update(1, dto)).toBe(expense);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove expense by id", async () => {
      const expense = { id: 1 };
      service.remove.mockResolvedValue(expense as ExpenseResponseDto);
      expect(await controller.remove(1)).toBe(expense);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
