import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";

import type { CanActivate } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

const mockAuthService = {};
class MockAuthGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
class MockRoleGuard implements CanActivate {
  canActivate() {
    return true;
  }
}

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
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .overrideGuard(RoleGuard)
      .useClass(MockRoleGuard)
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create an expense", async () => {
      const dto: CreateExpenseDto = {
        amount: 100,
        category: "FOOD",
        tripId: 1,
        description: "Lunch",
      };

      const result = {
        expense_id: 1,
        amount: dto.amount,
        category: dto.category,
        trip_id: dto.tripId,
        description: dto.description,
      };
      mockExpenseService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("should return all expenses", async () => {
      const result = [
        { expense_id: 1, amount: 100, category: "FOOD", trip_id: 1 },
        { expense_id: 2, amount: 50, category: "TRANSPORT", trip_id: 1 },
      ];
      mockExpenseService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockExpenseService.findAll).toHaveBeenCalled();
    });

    it("should return an empty array if no expenses are found", async () => {
      mockExpenseService.findAll.mockResolvedValue([]);

      expect(await controller.findAll()).toEqual([]);
      expect(mockExpenseService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return one expense", async () => {
      const result = {
        expense_id: 1,
        amount: 100,
        category: "FOOD",
        trip_id: 1,
      };
      mockExpenseService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw if not found", async () => {
      mockExpenseService.findOne.mockRejectedValue(
        new Error("Expense not found"),
      );

      await expect(controller.findOne(99)).rejects.toThrow("Expense not found");
    });
  });

  describe("update", () => {
    it("should update an expense", async () => {
      const dto: UpdateExpenseDto = { amount: 200, description: "Dinner" };
      const result = {
        expense_id: 1,
        amount: 200,
        description: "Dinner",
        category: "FOOD",
        trip_id: 1,
      };
      mockExpenseService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(mockExpenseService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove an expense", async () => {
      const result = { message: "Expense deleted successfully" };
      mockExpenseService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
    });
  });
});
