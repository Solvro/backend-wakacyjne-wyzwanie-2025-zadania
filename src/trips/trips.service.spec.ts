import { TripStatus } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { createMockPrismaService } from "../test/test-utils";
import type { CreateTripDto, UpdateTripDto } from "./dto/trip.dto";
import { TripsService } from "./trips.service";

describe("TripsService", () => {
  let service: TripsService;

  // Using centralized mock instead of inline declaration
  const mockPrismaService = createMockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all trips with participants, expenses and counts", async () => {
      const mockTrips = [
        {
          id: 1,
          name: "Summer Vacation",
          description: "A great trip",
          status: TripStatus.PLANNED,
          startDate: new Date("2025-07-01"),
          endDate: new Date("2025-07-15"),
          budget: 150_000,
          participants: [],
          expenses: [],
          _count: { participants: 0, expenses: 0 },
        },
      ];

      mockPrismaService.trip.findMany.mockResolvedValue(mockTrips);

      const result = await service.findAll();

      expect(result).toEqual(mockTrips);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledWith({
        include: {
          participants: true,
          expenses: true,
          _count: {
            select: {
              participants: true,
              expenses: true,
            },
          },
        },
      });
    });
  });

  describe("findOne", () => {
    it("should return a trip by id with participants and expenses", async () => {
      const mockTrip = {
        id: 1,
        name: "Summer Vacation",
        description: "A great trip",
        status: TripStatus.PLANNED,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-15"),
        budget: 150_000,
        participants: [],
        expenses: [],
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          participants: true,
          expenses: {
            include: {
              participant: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    });

    it("should throw NotFoundException when trip is not found", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        "Trip with ID 999 not found",
      );
    });
  });

  describe("create", () => {
    it("should create a new trip with default status", async () => {
      const createTripDto: CreateTripDto = {
        name: "New Trip",
        description: "A new adventure",
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        budget: 150_000,
      };

      const mockCreatedTrip = {
        id: 1,
        name: createTripDto.name,
        description: createTripDto.description,
        status: TripStatus.PLANNED,
        startDate: new Date(createTripDto.startDate),
        endDate: new Date(createTripDto.endDate),
        budget: createTripDto.budget,
        participants: [],
        expenses: [],
      };

      mockPrismaService.trip.create.mockResolvedValue(mockCreatedTrip);

      const result = await service.create(createTripDto);

      expect(result).toEqual(mockCreatedTrip);
      expect(mockPrismaService.trip.create).toHaveBeenCalledWith({
        data: {
          name: createTripDto.name,
          description: createTripDto.description,
          status: TripStatus.PLANNED,
          startDate: new Date(createTripDto.startDate),
          endDate: new Date(createTripDto.endDate),
          budget: createTripDto.budget,
        },
        include: {
          participants: true,
          expenses: true,
        },
      });
    });

    it("should create a new trip with specified status", async () => {
      const createTripDto: CreateTripDto = {
        name: "New Trip",
        description: "A new adventure",
        status: TripStatus.ACTIVE,
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        budget: 150_000,
      };

      const mockCreatedTrip = {
        id: 1,
        name: createTripDto.name,
        description: createTripDto.description,
        status: createTripDto.status,
        startDate: new Date(createTripDto.startDate),
        endDate: new Date(createTripDto.endDate),
        budget: createTripDto.budget,
        participants: [],
        expenses: [],
      };

      mockPrismaService.trip.create.mockResolvedValue(mockCreatedTrip);

      const result = await service.create(createTripDto);

      expect(result).toEqual(mockCreatedTrip);
      expect(mockPrismaService.trip.create).toHaveBeenCalledWith({
        data: {
          name: createTripDto.name,
          description: createTripDto.description,
          status: TripStatus.ACTIVE,
          startDate: new Date(createTripDto.startDate),
          endDate: new Date(createTripDto.endDate),
          budget: createTripDto.budget,
        },
        include: {
          participants: true,
          expenses: true,
        },
      });
    });
  });

  describe("update", () => {
    it("should update an existing trip", async () => {
      const updateTripDto: UpdateTripDto = {
        name: "Updated Trip",
        description: "Updated description",
        status: TripStatus.ACTIVE,
        startDate: "2025-08-01",
        endDate: "2025-08-15",
        budget: 200_000,
      };

      const existingTrip = { id: 1, name: "Old Trip" };
      const updatedTrip = {
        id: 1,
        name: updateTripDto.name,
        description: updateTripDto.description,
        status: updateTripDto.status,
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-08-15"),
        budget: updateTripDto.budget,
        participants: [],
        expenses: [],
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.trip.update.mockResolvedValue(updatedTrip);

      const result = await service.update(1, updateTripDto);

      expect(result).toEqual(updatedTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrismaService.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: updateTripDto.name,
          description: updateTripDto.description,
          status: updateTripDto.status,
          startDate: new Date("2025-08-01"),
          endDate: new Date("2025-08-15"),
          budget: updateTripDto.budget,
        },
        include: {
          participants: true,
          expenses: true,
        },
      });
    });

    it("should throw NotFoundException when trip to update is not found", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      const updateTripDto: UpdateTripDto = { name: "Updated Trip" };

      await expect(service.update(999, updateTripDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update(999, updateTripDto)).rejects.toThrow(
        "Trip with ID 999 not found",
      );
    });
  });

  describe("updateStatus", () => {
    it("should update trip status", async () => {
      const existingTrip = { id: 1, name: "Test Trip" };
      const updatedTrip = { ...existingTrip, status: TripStatus.ACTIVE };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.trip.update.mockResolvedValue(updatedTrip);

      const result = await service.updateStatus(1, TripStatus.ACTIVE);

      expect(result).toEqual(updatedTrip);
      expect(mockPrismaService.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: TripStatus.ACTIVE },
      });
    });

    it("should throw NotFoundException when trip to update status is not found", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus(999, TripStatus.ACTIVE),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should delete an existing trip", async () => {
      const existingTrip = { id: 1, name: "Test Trip" };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.trip.delete.mockResolvedValue(existingTrip);

      await service.remove(1);

      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockPrismaService.trip.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw NotFoundException when trip to delete is not found", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      await expect(service.remove(999)).rejects.toThrow(
        "Trip with ID 999 not found",
      );
    });
  });

  describe("getTripSummary", () => {
    it("should return trip summary with calculations", async () => {
      const mockTrip = {
        id: 1,
        name: "Summer Vacation",
        description: "A great trip",
        status: TripStatus.ACTIVE,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-15"),
        budget: 150_000,
        participants: [{ id: 1 }, { id: 2 }],
        expenses: [
          {
            id: 1,
            amount: 50_000,
            category: "ACCOMMODATION",
            participant: { name: "John Doe", email: "john@example.com" },
          },
          {
            id: 2,
            amount: 25_000,
            category: "FOOD",
            participant: { name: "Jane Smith", email: "jane@example.com" },
          },
          {
            id: 3,
            amount: 15_000,
            category: "ACCOMMODATION",
            participant: { name: "John Doe", email: "john@example.com" },
          },
        ],
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const result = await service.getTripSummary(1);

      expect(result).toEqual({
        trip: {
          id: 1,
          name: "Summer Vacation",
          description: "A great trip",
          status: TripStatus.ACTIVE,
          startDate: new Date("2025-07-01"),
          endDate: new Date("2025-07-15"),
          budget: 150_000,
        },
        summary: {
          participantsCount: 2,
          totalExpenses: 90_000,
          budgetRemaining: 60_000,
          expensesByCategory: {
            ACCOMMODATION: 65_000,
            FOOD: 25_000,
          },
          expensesByParticipant: {
            "John Doe": 65_000,
            "Jane Smith": 25_000,
          },
        },
      });
    });

    it("should handle null budget correctly", async () => {
      const mockTrip = {
        id: 1,
        name: "Summer Vacation",
        description: "A great trip",
        status: TripStatus.ACTIVE,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-15"),
        budget: null,
        participants: [],
        expenses: [],
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const result = await service.getTripSummary(1);

      expect(result.summary.budgetRemaining).toBeNull();
    });
  });

  describe("getTripParticipants", () => {
    it("should return participants for existing trip", async () => {
      const existingTrip = { id: 1, name: "Test Trip" };
      const mockParticipants = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          expenses: [],
        },
      ];

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.participant.findMany.mockResolvedValue(
        mockParticipants,
      );

      const result = await service.getTripParticipants(1);

      expect(result).toEqual(mockParticipants);
      expect(mockPrismaService.participant.findMany).toHaveBeenCalledWith({
        where: { tripId: 1 },
        include: {
          expenses: {
            select: {
              id: true,
              title: true,
              amount: true,
              category: true,
              date: true,
            },
          },
        },
      });
    });

    it("should throw NotFoundException when trip does not exist", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.getTripParticipants(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("getTripExpenses", () => {
    it("should return expenses for existing trip", async () => {
      const existingTrip = { id: 1, name: "Test Trip" };
      const mockExpenses = [
        {
          id: 1,
          title: "Hotel",
          amount: 50_000,
          participant: { name: "John Doe", email: "john@example.com" },
        },
      ];

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.expense.findMany.mockResolvedValue(mockExpenses);

      const result = await service.getTripExpenses(1);

      expect(result).toEqual(mockExpenses);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: { tripId: 1 },
        include: {
          participant: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      });
    });

    it("should throw NotFoundException when trip does not exist", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(service.getTripExpenses(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
