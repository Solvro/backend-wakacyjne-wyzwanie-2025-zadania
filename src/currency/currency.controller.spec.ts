import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

describe("CurrencyController", () => {
  let controller: CurrencyController;

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

  const mockCurrencyService = {
    create: jest.fn(({ data }: Currency) => {
      const newCurrency = { id: currencyCounter++, ...data };
      currenciesInMemory.push(newCurrency);
      return newCurrency;
    }) as jest.Mock,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    currenciesInMemory = [...initialCurrencies];
    currencyCounter = initialCurrencies.length + 1;

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a currency", async () => {
    const dto = {
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    };

    const expectedValue = { id: currencyCounter, ...dto };
    mockCurrencyService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);

    expect(mockCurrencyService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all currencies", async () => {
    const currencysMock = [...currenciesInMemory];

    mockCurrencyService.findAll.mockResolvedValue(currencysMock);

    const result = await controller.findAll();

    expect(result).toEqual(currencysMock);
    expect(mockCurrencyService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one currency", async () => {
    const currencyMock = {
      id: 1,
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    };

    mockCurrencyService.findOne.mockResolvedValue(currencyMock);
    const result = await controller.findOne(1);

    expect(result).toEqual(currencyMock);
    expect(mockCurrencyService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should update a currency", async () => {
    const dto = {
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    };
    const currencyMock = await controller.create(dto);

    const currencyUpdated = {
      currencyId: currencyMock.id,
      value: 1123,
      currencyCode: "NON",
      updatedAt: new Date(),
    };

    const dtoUpdate = {
      value: 1123,
    };

    mockCurrencyService.update.mockResolvedValue(currencyUpdated);

    const result = await controller.update(currencyMock.id, dtoUpdate);

    expect(mockCurrencyService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(currencyUpdated);
    expect(mockCurrencyService.update).toHaveBeenCalledWith(3, dtoUpdate);
  });

  it("should delete a currency", async () => {
    const currencyMock = {
      currencyId: 1,
      value: 12,
      currencyCode: "NON",
      updatedAt: new Date(),
    };

    mockCurrencyService.remove.mockResolvedValue(currencyMock);

    const result = await controller.remove(1);

    expect(result).toEqual(currencyMock);
    expect(mockCurrencyService.remove).toHaveBeenCalled();
    expect(mockCurrencyService.remove).toHaveBeenCalledWith(1);
  });
});
