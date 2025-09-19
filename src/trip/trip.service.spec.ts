import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { TripStatus } from "../enums/enums";
import { PrismaService } from "../prisma/prisma.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  const mockPrismaService = {
    trip: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    expenseParticipant: {
      deleteMany: jest.fn(),
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
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a trip successfully", async () => {
      const createTripDto = {
        name: "Test Trip",
        status: TripStatus.planned,
        start_date: "2025-07-01T00:00:00.000Z",
        end_date: "2025-07-15T00:00:00.000Z",
        location: "Barcelona, Spain",
      };
      const expectedTrip = { id: 1, ...createTripDto };

      mockPrismaService.trip.create.mockResolvedValue(expectedTrip);

      const result = await service.create(createTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockPrismaService.trip.create).toHaveBeenCalledWith({
        data: createTripDto,
      });
      expect(mockPrismaService.trip.create).toHaveBeenCalledTimes(1);
    });

    it("should create a trip with minimal data", async () => {
      const createTripDto = {
        name: "Minimal Trip",
        status: TripStatus.planned,
      };
      const expectedTrip = { id: 1, ...createTripDto };

      mockPrismaService.trip.create.mockResolvedValue(expectedTrip);

      const result = await service.create(createTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockPrismaService.trip.create).toHaveBeenCalledWith({
        data: createTripDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all trips with participants and expenses", async () => {
      const expectedTrips = [
        {
          id: 1,
          name: "Trip 1",
          status: TripStatus.planned,
          participants: [],
          expenses: [],
        },
        {
          id: 2,
          name: "Trip 2",
          status: TripStatus.ongoing,
          participants: [],
          expenses: [],
        },
      ];

      mockPrismaService.trip.findMany.mockResolvedValue(expectedTrips);

      const result = await service.findAll();

      expect(result).toEqual(expectedTrips);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledWith({
        include: {
          participants: true,
          expenses: true,
        },
      });
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no trips exist", async () => {
      mockPrismaService.trip.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a trip with all related data", async () => {
      const tripId = 1;
      const expectedTrip = {
        id: tripId,
        name: "Test Trip",
        status: TripStatus.planned,
        participants: [{ id: 1, name: "John", email: "john@example.com" }],
        expenses: [{ id: 1, amount: 100, description: "Hotel" }],
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(expectedTrip);

      const result = await service.findOne(tripId);

      expect(result).toEqual(expectedTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: tripId },
        include: {
          participants: true,
          expenses: {
            include: {
              expense_participants: {
                include: {
                  participant: true,
                },
              },
            },
          },
        },
      });
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should throw NotFoundException when trip does not exist", async () => {
      const tripId = 999;
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.findOne(tripId)).rejects.toThrow(
        new NotFoundException(`Trip with ID ${tripId.toString()} not found`),
      );
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should update a trip successfully", async () => {
      const tripId = 1;
      const updateTripDto = {
        name: "Updated Trip",
        status: TripStatus.ongoing,
      };
      const existingTrip = {
        id: tripId,
        name: "Original Trip",
        status: TripStatus.planned,
      };
      const updatedTrip = { ...existingTrip, ...updateTripDto };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.trip.update.mockResolvedValue(updatedTrip);

      const result = await service.update(tripId, updateTripDto);

      expect(result).toEqual(updatedTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: tripId },
      });
      expect(mockPrismaService.trip.update).toHaveBeenCalledWith({
        where: { id: tripId },
        data: updateTripDto,
      });
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.trip.update).toHaveBeenCalledTimes(1);
    });

    it("should throw NotFoundException when updating non-existent trip", async () => {
      const tripId = 999;
      const updateTripDto = { name: "Updated Trip" };

      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.update(tripId, updateTripDto)).rejects.toThrow(
        new NotFoundException(`Trip with ID ${tripId.toString()} not found`),
      );
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.trip.update).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("should delete a trip successfully", async () => {
      const tripId = 1;
      const existingTrip = {
        id: tripId,
        name: "Test Trip",
        status: TripStatus.planned,
      };
      const deletedTrip = { ...existingTrip };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.expenseParticipant.deleteMany.mockResolvedValue({
        count: 3,
      });
      mockPrismaService.expense.deleteMany.mockResolvedValue({ count: 2 });
      mockPrismaService.participant.deleteMany.mockResolvedValue({ count: 1 });
      mockPrismaService.trip.delete.mockResolvedValue(deletedTrip);

      const result = await service.remove(tripId);

      expect(result).toEqual(deletedTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: tripId },
      });
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledWith({
        where: { trip_id: tripId },
      });
      expect(mockPrismaService.expense.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: tripId },
      });
      expect(mockPrismaService.participant.deleteMany).toHaveBeenCalledWith({
        where: { trip_id: tripId },
      });
      expect(mockPrismaService.trip.delete).toHaveBeenCalledWith({
        where: { id: tripId },
      });
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.expense.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.participant.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.trip.delete).toHaveBeenCalledTimes(1);
    });

    it("should throw NotFoundException when deleting non-existent trip", async () => {
      const tripId = 999;

      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.remove(tripId)).rejects.toThrow(
        new NotFoundException(`Trip with ID ${tripId.toString()} not found`),
      );
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.trip.delete).not.toHaveBeenCalled();
    });
  });

  describe("findTripsByStatus", () => {
    it("should return trips filtered by status", async () => {
      const status = TripStatus.ongoing;
      const expectedTrips = [
        {
          id: 1,
          name: "Active Trip 1",
          status: TripStatus.ongoing,
          participants: [],
          expenses: [],
        },
        {
          id: 2,
          name: "Active Trip 2",
          status: TripStatus.ongoing,
          participants: [],
          expenses: [],
        },
      ];

      mockPrismaService.trip.findMany.mockResolvedValue(expectedTrips);

      const result = await service.findTripsByStatus(status);

      expect(result).toEqual(expectedTrips);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledWith({
        where: { status },
        include: {
          participants: true,
          expenses: true,
        },
      });
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no trips with specified status exist", async () => {
      const status = TripStatus.cancelled;
      mockPrismaService.trip.findMany.mockResolvedValue([]);

      const result = await service.findTripsByStatus(status);

      expect(result).toEqual([]);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledWith({
        where: { status },
        include: {
          participants: true,
          expenses: true,
        },
      });
    });
  });
});
