import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  let db: DatabaseService;

  const mockDb = {
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
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    db = module.get<DatabaseService>(DatabaseService);

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
      const dto = {
        name: "Test Trip",
        destination: "Paris",
        start_date: new Date("2025-01-01"),
        end_date: new Date("2025-01-10"),
        budget: 1000,
      };
      const created = { trip_id: 1, ...dto, expenses: [], participants: [] };

      (mockDb.trip.create as jest.Mock).mockResolvedValue(created);

      const result = await service.create(dto as any);

      expect(result).toEqual(created);
      expect(mockDb.trip.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining(dto) }),
      );
    });
  });

  describe("findAll", () => {
    it("should return trips", async () => {
      const trips = [{ trip_id: 1, name: "Trip 1" }];
      (mockDb.trip.findMany as jest.Mock).mockResolvedValue(trips);

      const result = await service.findAll();

      expect(result).toEqual(trips);
      expect(mockDb.trip.findMany).toHaveBeenCalled();
    });
  });

  describe("findOnePublic", () => {
    it("should return a trip if found", async () => {
      const trip = { trip_id: 1, name: "Trip 1" };
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(trip);

      const result = await service.findOnePublic(1);
      expect(result).toEqual(trip);
    });

    it("should throw if not found", async () => {
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

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
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(trip);

      const result = await service.findOnePrivate(1);
      expect(result).toEqual(trip);
    });

    it("should throw if not found", async () => {
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOnePrivate(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    it("should update a trip if found", async () => {
      const existing = { trip_id: 1 };
      const updated = { trip_id: 1, name: "Updated Trip" };

      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(existing);
      (mockDb.trip.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(1, { name: "Updated Trip" } as any);

      expect(result).toEqual(updated);
      expect(mockDb.trip.update).toHaveBeenCalledWith({
        where: { trip_id: 1 },
        data: expect.objectContaining({ name: "Updated Trip" }),
      });
    });

    it("should throw if trip not found", async () => {
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, { name: "X" } as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should remove trip if exists", async () => {
      const existing = { trip_id: 1 };
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(existing);

      await service.remove(1);

      expect(mockDb.expense.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDb.participant.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(mockDb.trip.delete).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
    });

    it("should throw if trip not found", async () => {
      (mockDb.trip.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
