import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { CurrencyService } from "./currency.service";

describe("CurrencyService", () => {
  let service: CurrencyService;

  let currenciesInMemory: {
    currencyCode: string;
    rate: number;
    updatedAt: Date;
  }[] = [];

  const initialCurrencies = [
    {
      rate: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    },
    {
      rate: 12,
      currencyCode: "AU",
      updatedAt: new Date(),
    },
  ];

  interface Currency {
    data: {
      currencyCode: string;
      rate: number;
      updatedAt: Date;
    };
  }

  const mockDatabaseService = {
    currency: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Currency) => {
        const newCurrency = { ...data };
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
      rate: 12,
      currencyCode: "VE",
      updatedAt: new Date(),
    };

    mockDatabaseService.currency.findUnique.mockResolvedValue(null);

    const result = await service.create(dto);

    expect(result.currencyCode).toBe("VE");

    expect(mockDatabaseService.currency.create).toHaveBeenCalledWith({
      data: {
        rate: dto.rate,
        currencyCode: dto.currencyCode,
      },
    });

    expect(result).toEqual({
      rate: 12,
      currencyCode: "VE",
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
      rate: 12,
      currencyCode: "VE",
    };

    mockDatabaseService.currency.findUnique.mockResolvedValue(currencyMock);
    const result = await service.findOne("VE");

    expect(result).toEqual(currencyMock);
    expect(mockDatabaseService.currency.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a currency", async () => {
    const dto = {
      rate: 12,
      currencyCode: "VE",
    };

    mockDatabaseService.currency.findUnique.mockResolvedValue(null);

    const currencyMock = await service.create(dto);

    const currencyUpdated = {
      rate: 1123,
      currencyCode: "VE",
    };

    const dtoUpdate = {
      rate: 1123,
    };

    mockDatabaseService.currency.update.mockResolvedValue(currencyUpdated);

    const result = await service.update(currencyMock.currencyCode, dtoUpdate);

    expect(mockDatabaseService.currency.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(currencyUpdated);
    expect(mockDatabaseService.currency.update).toHaveBeenCalledWith({
      where: { currencyCode: currencyMock.currencyCode },
      data: dtoUpdate,
    });
  });

  it("should delete a currency", async () => {
    const currencyMock = {
      rate: 12,
      currencyCode: "VE",
    };

    mockDatabaseService.currency.delete.mockResolvedValue(currencyMock);

    const result = await service.remove("VE");

    expect(result).toEqual(currencyMock);
    expect(mockDatabaseService.currency.delete).toHaveBeenCalled();
    expect(mockDatabaseService.currency.delete).toHaveBeenCalledWith({
      where: { currencyCode: currencyMock.currencyCode },
    });
  });
});
