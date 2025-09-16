import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("espense controller", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn(async (dto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await {
        id: Date.now(),
        ...dto,
      };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    update: jest.fn((id, dto) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id,
      ...dto,
    })),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = { validateUser: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        ExpenseService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defind", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto = {
      amount: 123,
      description: "oplata",
      createdAt: new Date(2025, 8, 14, 12, 30, 0),
      tripId: 1,
    };

    const result = await controller.create(dto);
    expect(result).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      ...dto,
    });
    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all expenses", async () => {
    const dto = [
      {
        id: 1,
        amount: 100,
        description: "Lunch",
        createdAt: new Date(),
        tripId: 1,
      },
      {
        id: 2,
        amount: 200,
        description: "Taxi",
        createdAt: new Date(),
        tripId: 1,
      },
    ];

    mockExpenseService.findAll.mockResolvedValue(dto);

    const result = await controller.findAll();

    expect(result).toEqual(dto);
    expect(mockExpenseService.findAll).toHaveBeenCalled();
  });

  it("should return expense by id", async () => {
    const dto = {
      id: 1,
      amount: 100,
      description: "Lunch",
      createdAt: new Date(),
      tripId: 1,
    };
    mockExpenseService.findOne.mockResolvedValue(dto);

    const result = await controller.findOne("1");

    expect(result).toEqual(dto);
    expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update an expense", async () => {
    const id = 1;
    const dto = { amount: 200, description: "updated opłata" };

    const updatedExpense = {
      id,
      ...dto,
      createdAt: new Date(2025, 8, 14, 12, 30, 0),
      tripId: 1,
    };
    mockExpenseService.update.mockResolvedValue(updatedExpense);

    const result = await controller.update(id.toString(), dto);

    expect(result).toEqual(updatedExpense);
    expect(mockExpenseService.update).toHaveBeenCalledWith(id, dto);
  });

  it("should delete expense", async () => {
    const dto = {
      id: 1,
      amount: 100,
      description: "Lunch",
      createdAt: new Date(),
      tripId: 1,
    };
    mockExpenseService.remove.mockResolvedValue(dto);

    const result = await controller.remove("1");
    expect(result).toEqual(dto);
    expect(mockExpenseService.remove).toHaveBeenCalledWith(1);
  });
});
