import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  const mockDatabaseService = {
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
    tripParticipants: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<TripService>(TripService);
  });

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create a trip", async () => {
      const dto = {
        destination: "Paris",
        description: "Vacation",
        startDate: "2025-01-01",
        endDate: "2025-01-10",
      };
      const result = { trip_id: 1, ...dto, expenses: [], participants: [] };

      mockDatabaseService.trip.create.mockResolvedValue(result);

      const response = await service.create(dto);
      expect(response).toEqual(result);
      expect(mockDatabaseService.trip.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            destination: dto.destination,
            description: dto.description,
            start_date: new Date(dto.startDate),
            end_date: new Date(dto.endDate),
          },
          include: {
            expenses: true,
            participants: true,
          },
        }),
      );
    });
  });

  describe("findAll", () => {
    it("should return all trips", async () => {
      const trips = [
        { trip_id: 1, destination: "Paris", expenses: [], participants: [] },
      ];
      mockDatabaseService.trip.findMany.mockResolvedValue(trips);

      const response = await service.findAll();
      expect(response).toEqual(trips);
      expect(mockDatabaseService.trip.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: {
            expenses: {
              orderBy: { created_at: "desc" },
              take: 5,
            },
            participants: {
              orderBy: {
                participant_id: "asc",
              },
              take: 5,
            },
          },
          orderBy: { created_at: "desc" },
        }),
      );
    });
  });

  describe("findOne", () => {
    it("should return a trip if found", async () => {
      const trip = {
        trip_id: 1,
        destination: "Paris",
        expenses: [],
        participants: [],
      };
      mockDatabaseService.trip.findUnique.mockResolvedValue(trip);

      const response = await service.findOne(1);
      expect(response).toEqual(trip);
      expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { trip_id: 1 },
          include: { expenses: true, participants: true },
        }),
      );
    });

    it("should throw if trip not found", async () => {
      mockDatabaseService.trip.findUnique.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a trip if exists", async () => {
      const existing = { trip_id: 1 };
      const dto = {
        destination: "London",
        description: "Holiday",
        startDate: "2025-02-01",
        endDate: "2025-02-10",
      };
      const updated = { trip_id: 1, ...dto, expenses: [], participants: [] };

      mockDatabaseService.trip.findUnique.mockResolvedValue(existing);
      mockDatabaseService.trip.update.mockResolvedValue(updated);

      const response = await service.update(1, dto);
      expect(response).toEqual(updated);
      expect(mockDatabaseService.trip.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { trip_id: 1 },
          data: {
            destination: dto.destination,
            description: dto.description,
            start_date: dto.startDate,
            end_date: dto.endDate,
          },
          include: { expenses: true, participants: true },
        }),
      );
    });

    it("should throw if trip not found", async () => {
      mockDatabaseService.trip.findUnique.mockResolvedValue(null);

      await expect(service.update(99, { destination: "Test" })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should delete a trip and related data if exists", async () => {
      const existing = { trip_id: 1 };
      mockDatabaseService.trip.findUnique.mockResolvedValue(existing);
      mockDatabaseService.expense.deleteMany.mockResolvedValue({});
      mockDatabaseService.tripParticipants.deleteMany.mockResolvedValue({});
      mockDatabaseService.trip.delete.mockResolvedValue({});

      const response = await service.remove(1);
      expect(response).toEqual({
        message: "Trip with ID 1 deleted successfully",
      });
      expect(mockDatabaseService.expense.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
      expect(
        mockDatabaseService.tripParticipants.deleteMany,
      ).toHaveBeenCalledWith({ where: { trip_id: 1 } });
      expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
        where: { trip_id: 1 },
      });
    });

    it("should throw if trip not found", async () => {
      mockDatabaseService.trip.findUnique.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
