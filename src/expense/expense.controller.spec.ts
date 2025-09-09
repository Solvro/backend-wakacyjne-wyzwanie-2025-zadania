import { expense_category } from "@prisma/client";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import type { CreateExpenseDto } from "./dto/create-expense.dto";
import type { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;
  let service: ExpenseService;

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
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("powinien być zdefiniowany", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("powinien utworzyć nowy wydatek", async () => {
      const dto: CreateExpenseDto = {
        amount: 500,
        trip_id: 1,
        category: expense_category.food,
      };

      // Zamiast spread operator - tworzymy obiekt ręcznie
      const expectedResult = {
        id: 1,
        amount: 500,
        trip_id: 1,
        category: expense_category.food,
      };

      mockExpenseService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      // Używamy .mock.calls zamiast bezpośrednich referencji do metod
      expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
      expect(mockExpenseService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić wszystkie wydatki", async () => {
      const expenses = [
        { id: 1, amount: 500, trip_id: 1, category: expense_category.food },
        {
          id: 2,
          amount: 300,
          trip_id: 1,
          category: expense_category.transport,
        },
      ];

      mockExpenseService.findAll.mockResolvedValue(expenses);

      const result = await controller.findAll();

      expect(result).toEqual(expenses);
      expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("powinien zwrócić pojedynczy wydatek po ID", async () => {
      const expense = {
        id: 1,
        amount: 500,
        trip_id: 1,
        category: expense_category.food,
      };

      mockExpenseService.findOne.mockResolvedValue(expense);

      const result = await controller.findOne("1");

      expect(result).toEqual(expense);
      expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
      expect(mockExpenseService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("update", () => {
    it("powinien zaktualizować wydatek", async () => {
      const dto: UpdateExpenseDto = { amount: 700 };
      // Zamiast spread operator - tworzymy obiekt ręcznie
      const updatedExpense = {
        id: 1,
        amount: 700,
        trip_id: 1,
        category: expense_category.food,
      };

      mockExpenseService.update.mockResolvedValue(updatedExpense);

      const result = await controller.update("1", dto);

      expect(result).toEqual(updatedExpense);
      expect(mockExpenseService.update).toHaveBeenCalledWith(1, dto);
      expect(mockExpenseService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("remove", () => {
    it("powinien usunąć wydatek po ID", async () => {
      const deletedExpense = {
        id: 1,
        amount: 500,
        trip_id: 1,
        category: expense_category.food,
      };

      mockExpenseService.remove.mockResolvedValue(deletedExpense);

      const result = await controller.remove("1");

      expect(result).toEqual(deletedExpense);
      expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
      expect(mockExpenseService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
