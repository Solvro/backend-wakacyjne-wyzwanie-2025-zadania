import { ExpenseCategory } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

describe("ExpenseController", () => {
  let controller: ExpenseController;
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [{ provide: ExpenseService, useValue: mockService }],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("findAll calls service", async () => {
    mockService.findAll.mockResolvedValue([]);
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it("findOne delegates to service", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });
    await expect(controller.findOne(1)).resolves.toMatchObject({ id: 1 });
    expect(mockService.findOne).toHaveBeenCalledWith(1);
  });

  it("create delegates to service", async () => {
    const dto = {
      participantId: 1,
      amount: 12.5,
      category: ExpenseCategory.FOOD,
      amountPLN: 12.5,
    };
    mockService.create.mockResolvedValue({ id: 11, ...dto });
    await expect(controller.create(dto)).resolves.toMatchObject({ id: 11 });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it("update delegates to service", async () => {
    const dto = { amount: 20 };
    mockService.update.mockResolvedValue({ id: 3, ...dto });
    await expect(controller.update(3, dto)).resolves.toMatchObject({ id: 3 });
    expect(mockService.update).toHaveBeenCalledWith(3, dto);
  });

  it("remove delegates to service", async () => {
    mockService.remove.mockResolvedValue({ deleted: true });
    await expect(controller.remove(4)).resolves.toEqual({ deleted: true });
    expect(mockService.remove).toHaveBeenCalledWith(4);
  });
});
