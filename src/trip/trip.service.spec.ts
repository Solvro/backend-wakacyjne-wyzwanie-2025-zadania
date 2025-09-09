/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateTripDto } from "./dto/create-trip.dto";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  let database: DatabaseService;

  const mockTripBase = {
    type: "leisure",
    start_date: new Date("2000-01-01"),
    end_date: new Date("2000-01-07"),
  };

  const mockTrip1 = {
    id: 1,
    destination: "Bałtyk",
    ...mockTripBase,
  };

  const mockTrip2 = {
    id: 2,
    destination: "Tatry",
    type: "adventure",
    start_date: new Date("2001-01-01"),
    end_date: new Date("2001-01-07"),
  };

  const mockDatabase = {
    trip: {
      findMany: jest.fn().mockResolvedValue([mockTrip1, mockTrip2]),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
          return mockTrip1;
        }
        if (where.id === 2) {
          return mockTrip2;
        }
        return null;
      }),
      create: jest
        .fn()
        .mockImplementation(({ data }) => ({
          id: 3,
          ...mockTripBase,
          ...data,
        })),
      update: jest
        .fn()
        .mockImplementation(({ where, data }) => ({
          ...mockTrip1,
          ...data,
          id: where.id,
        })),
      delete: jest.fn().mockResolvedValue(mockTrip1),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        { provide: DatabaseService, useValue: mockDatabase },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    database = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  describe("create", () => {
    it("powinien utworzyć nową wycieczkę", async () => {
      const dto: CreateTripDto = {
        destination: "Bałtyk",
        type: "leisure",
        start_date: new Date("2000-01-01"),
        end_date: new Date("2000-01-07"),
      };

      const result = await service.create(dto);

      expect(result).toHaveProperty("id");
      expect(result.destination).toBe(dto.destination);
      expect(database.trip.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić wszystkie wycieczki", async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].destination).toBe("Bałtyk");
      expect(result[1].destination).toBe("Tatry");
      expect(database.trip.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("powinno znaleźć wycieczkę o danym id", async () => {
      const result = await service.findOne(1);

      expect(result?.destination).toBe("Bałtyk");
      expect(database.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("powinno zwrócić null, gdy wycieczka nie istnieje", async () => {
      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(database.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe("update", () => {
    it("powinien zaktualizować istniejącą wycieczkę", async () => {
      const dto = { destination: "Mazury" };
      const result = await service.update(1, dto);

      expect(result.id).toBe(1);
      expect(result.destination).toBe("Mazury");
      expect(database.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe("remove", () => {
    it("powinien usunąć wycieczkę o danym id", async () => {
      const result = await service.remove(1);

      expect(result.id).toBe(1);
      expect(database.trip.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
