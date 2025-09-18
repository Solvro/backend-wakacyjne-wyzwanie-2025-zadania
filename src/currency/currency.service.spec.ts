/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { CurrencyService } from "./currency.service";

describe("CurrencyService", () => {
  let service: CurrencyService;

  let currencyCounter = 1;

  let currenciesInMemory: {
    id: number;
    currencyCode: string;
    value: number;
    updatedAt: Date;
  }[] = [];

  const initialCurrencies = [
    {
      id: 1,
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    },
    {
      id: 2,
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    },
  ];

  interface Currency {
    data: {
      currencyCode: string;
      value: number;
      updatedAt: Date;
    };
  }

  const mockDatabaseService = {
    currency: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Currency) => {
        const newCurrency = { id: currencyCounter++, ...data };
        currenciesInMemory.push(newCurrency);
        return newCurrency;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    currenciesInMemory = [...initialCurrencies];
    currencyCounter = initialCurrencies.length + 1;

    service = module.get<CurrencyService>(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new currency", async () => {
    const dto = {
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");

    expect(result.currencyCode).toBe("NON");

    expect(mockDatabaseService.currency.create).toHaveBeenCalledWith({
      data: {
        value: dto.value,
        currencyCode: dto.currencyCode,
      },
    });

    expect(result).toEqual({
      id: expect.any(Number),
      value: 12,
      currencyCode: "NON",
    });
  });

  it("should return list of all currencies", async () => {
    const currencyMock = [...currenciesInMemory];
    mockDatabaseService.currency.findMany.mockResolvedValue(currencyMock);
    const result = await service.findAll();

    expect(result).toEqual(currencyMock);
    expect(mockDatabaseService.currency.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one currency", async () => {
    const currencyMock = {
      id: 1,
      value: 12,
      currencyCode: "NON",
    };

    mockDatabaseService.currency.findUnique.mockResolvedValue(currencyMock);
    const result = await service.findOne(1);

    expect(result).toEqual(currencyMock);
    expect(mockDatabaseService.currency.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a currency", async () => {
    const dto = {
      value: 12,
      currencyCode: "NON",
    };
    const currencyMock = await service.create(dto);

    const currencyUpdated = {
      currencyId: currencyMock.id,
      value: 1123,
      currencyCode: "NON",
    };

    const dtoUpdate = {
      value: 1123,
    };

    mockDatabaseService.currency.update.mockResolvedValue(currencyUpdated);

    const result = await service.update(currencyMock.id, dtoUpdate);

    expect(mockDatabaseService.currency.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(currencyUpdated);
    expect(mockDatabaseService.currency.update).toHaveBeenCalledWith({
      where: { id: currencyMock.id },
      data: dtoUpdate,
    });
  });

  it("should delete a currency", async () => {
    const currencyMock = {
      currencyId: 1,
      value: 12,
      currencyCode: "NON",
    };

    mockDatabaseService.currency.delete.mockResolvedValue(currencyMock);

    const result = await service.remove(1);

    expect(result).toEqual(currencyMock);
    expect(mockDatabaseService.currency.delete).toHaveBeenCalled();
    expect(mockDatabaseService.currency.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should throw NotFoundException when currency not found", async () => {
    mockDatabaseService.currency.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
