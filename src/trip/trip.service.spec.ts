import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  const mockDatabase = {
    trip: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    expense: {
      deleteMany: jest.fn(),
    },
    participant: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: DatabaseService,
          useValue: mockDatabase,
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a trip", async () => {
      const dto: CreateTripDto = {
        name: "Test Trip",
        destination: "Paris",
        start_date: new Date("2025-01-01").toISOString(),
        end_date: new Date("2025-01-10").toISOString(),
        budget: 1000,
      };

      const created = Object.assign(
        { trip_id: 1, expenses: [], participants: [] },
        dto,
      );

      jest.mocked(mockDatabase.trip.create).mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);

      const expectedData: { data: CreateTripDto } = { data: dto };

      expect(mockDatabase.trip.create).toHaveBeenCalledWith(
        expect.objectContaining(expectedData),
      );
    });
  });

  describe("findAll", () => {
    it("should return trips", async () => {
      const trips = [{ trip_id: 1, name: "Trip 1" }];
      jest.mocked(mockDatabase.trip.findMany).mockResolvedValue(trips);

      const result = await service.findAll();

      expect(result).toEqual(trips);
      expect(mockDatabase.trip.findMany).toHaveBeenCalled();
    });
  });

  describe("findOnePublic", () => {
    it("should return a trip if found", async () => {
      const trip = { trip_id: 1, name: "Trip 1" };
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(trip);

      const result = await service.findOnePublic(1);
      expect(result).toEqual(trip);
    });

    it("should throw if not found", async () => {
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(null);

      await expect(service.findOnePublic(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findOnePrivate", () => {
    it("should return a private trip if found", async () => {
      const trip = {
        trip_id: 1,
        name: "Trip 1",
        budget: 500,
        participants: [],
      };
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(trip);

      const result = await service.findOnePrivate(1);
      expect(result).toEqual(trip);
    });

    it("should throw if not found", async () => {
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(null);

      await expect(service.findOnePrivate(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    it("should update a trip if found", async () => {
      const existing = { trip_id: 1 };
      const dto: UpdateTripDto = { name: "Updated Trip" };
      const updated = Object.assign({ trip_id: 1 }, dto);

      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(existing);
      jest.mocked(mockDatabase.trip.update).mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);

      const expectedUpdate: {
        where: { trip_id: number };
        data: UpdateTripDto;
      } = {
        where: { trip_id: 1 },
        data: dto,
      };

      expect(mockDatabase.trip.update).toHaveBeenCalledWith(
        expect.objectContaining(expectedUpdate),
      );
    });

    it("should throw if trip not found", async () => {
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(null);

      const dto: UpdateTripDto = { name: "X" };

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should remove trip if exists", async () => {
      const existing = { trip_id: 1 };
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(existing);

      await service.remove(1);

      expect(mockDatabase.expense.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDatabase.participant.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDatabase.trip.delete).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
    });

    it("should throw if trip not found", async () => {
      jest.mocked(mockDatabase.trip.findUnique).mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
