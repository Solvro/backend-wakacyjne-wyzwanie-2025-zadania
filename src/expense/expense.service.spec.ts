import { ExpenseCategory } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { mockPrisma } from "../../test/utils/mock-prisma";
import { CurrencyService } from "../currency/currency.service";
import { PrismaService } from "../prisma/prisma.service";
import { ExpenseService } from "./expense.service";

describe("ExpenseService", () => {
  let service: ExpenseService;
  const prismaMock = mockPrisma();

  const currencyServiceMock = {
    convertToPLN: jest
      .fn()
      .mockImplementation((amount: number): number => amount),
    getRate: jest.fn().mockResolvedValue(4.5),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
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

  test("findAll returns expenses", async () => {
    const fake = [{ id: 1, amount: 10 }];
    prismaMock.expense.findMany.mockResolvedValue(fake);
    const response = await service.findAll();
    expect(response).toBe(fake);
    expect(prismaMock.expense.findMany).toHaveBeenCalledWith({
      include: { participant: { include: { trip: true } } },
    });
  });

  test("findOne throws when not found", async () => {
    prismaMock.expense.findUnique.mockResolvedValue(null);
    await expect(service.findOne(3)).rejects.toThrow(NotFoundException);
  });

  test("create checks participant exists and creates expense", async () => {
    const dto = {
      participantId: 7,
      amount: 100,
      category: ExpenseCategory.FOOD,
      amountPLN: 100,
    };
    prismaMock.participant.findUnique.mockResolvedValue({ id: 7 });
    prismaMock.expense.create.mockResolvedValue({ id: 99, ...dto });
    const response = await service.create(dto);
    expect(response).toEqual({ id: 99, ...dto });
    expect(prismaMock.participant.findUnique).toHaveBeenCalledWith({
      where: { id: dto.participantId },
    });
    expect(prismaMock.expense.create).toHaveBeenCalled();
  });

  test("create throws when participant not found", async () => {
    prismaMock.participant.findUnique.mockResolvedValue(null);
    await expect(
      service.create({ participantId: 7, amount: 1, category: "FOOD" }),
    ).rejects.toThrow(NotFoundException);
  });

  test("update throws when expense missing", async () => {
    prismaMock.expense.findUnique.mockResolvedValue(null);
    await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
  });

  test("update updates expense when found", async () => {
    prismaMock.expense.findUnique.mockResolvedValue({ id: 3 });
    prismaMock.expense.update.mockResolvedValue({ id: 3, amount: 55 });

    const response = await service.update(3, { amount: 55 });
    expect(response).toEqual({ id: 3, amount: 55 });
    expect(prismaMock.expense.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { amount: 55, amountPLN: 247.5 },
    });
  });

  test("remove deletes expense when exists", async () => {
    prismaMock.expense.findUnique.mockResolvedValue({ id: 4 });
    prismaMock.expense.delete.mockResolvedValue({ id: 4 });
    const response = await service.remove(4);
    expect(response).toEqual({ deleted: true });
    expect(prismaMock.expense.delete).toHaveBeenCalledWith({
      where: { id: 4 },
    });
  });
});
