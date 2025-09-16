import { Category, Role } from "@prisma/client";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import type { PaginationDto } from "src/pagination/pagination.dto";
import type { ParticipantMetadata } from "src/participant/dto/participant-metadata.dto";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;

  const mockExpenseService = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService],
      imports: [AuthModule, DatabaseModule],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create new record", async () => {
    const dto = {
      expense_id: 1,
      title: "wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
    };

    const participant: ParticipantMetadata = {
      email: "janusz@example.com",
      participant_id: 1,
      role: Role.Participant,
    };

    mockExpenseService.create.mockReturnValue(dto);

    const result = await controller.create(dto, { participant });

    expect(result).toEqual(dto);
    expect(mockExpenseService.create).toHaveBeenCalledTimes(1);
  });

  it("should update an existing expense", async () => {
    const dto = {
      expense_id: 1,
      title: "Wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };
    mockExpenseService.create.mockReturnValue(dto);

    const resultCreate = await controller.create(dto, {
      participant: {
        email: "janusz@example.com",
        participant_id: 1,
        role: Role.Participant,
      },
    });
    expect(resultCreate.amount).toBe(200);

    const dtoUpdate = {
      amount: 250,
    };

    const updatedExpense = { ...dto, ...dtoUpdate };
    mockExpenseService.update.mockReturnValue(updatedExpense);

    const result = await controller.update(dto.expense_id, dtoUpdate);
    expect(result.amount).toBe(250);
    expect(mockExpenseService.create).toHaveBeenCalled();
    expect(mockExpenseService.update).toHaveBeenCalledTimes(1);
  });

  it("should find one expense by id", async () => {
    const dto = {
      expense_id: 1,
      title: "Wydatek",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };

    mockExpenseService.findOne.mockReturnValue(dto);

    const result = await controller.findOne(1);
    expect(result).toHaveProperty("expense_id", 1);
    expect(mockExpenseService.findOne).toHaveBeenCalledWith(1);
    expect(mockExpenseService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should find many expenses", async () => {
    const dto1 = {
      expense_id: 1,
      title: "Wydatek 1",
      category: Category.Jedzenie,
      amount: 200,
      date: "2025-09-11T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };
    const dto2 = {
      expense_id: 2,
      title: "Wydatek 2",
      category: Category.Transport,
      amount: 150,
      date: "2025-09-12T00:00:00Z",
      trip_id: 1,
      participant_id: 1,
    };

    mockExpenseService.findAll.mockReturnValue([dto1, dto2]);
    const paginationDto: PaginationDto = { limit: 10, skip: 0 };

    const result = await controller.findAll(paginationDto);
    expect(result).toHaveLength(2);
    expect(mockExpenseService.findAll).toHaveBeenCalled();
    expect(mockExpenseService.findAll).toHaveBeenCalledTimes(1);
  });
});
