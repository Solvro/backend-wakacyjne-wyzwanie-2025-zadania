import { TravelType } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "./trips.service";

describe("TripsService", () => {
  let service: TripsService;

  const mockPrismaService = {
    trip: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

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

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all trips", async () => {
      const mockTrips = [
        {
          id: 1,
          name: "Trip 1",
          description: "Description 1",
          destination: "Destination 1",
          travel_type: TravelType.PLANE,
          start_date: new Date(),
          end_date: new Date(),
          coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
        },
      ];
      mockPrismaService.trip.findMany.mockResolvedValue(mockTrips);

      const result = await service.findAll();

      expect(result).toEqual(mockTrips);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a trip by id", async () => {
      const mockTrip = {
        id: 1,
        name: "Trip 1",
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
        expenses: [],
      };
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTrip);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTrip);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          coordinator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          expenses: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    });
  });

  describe("create", () => {
    it("should create a new trip", async () => {
      const createTripDto = {
        name: "New Trip",
        description: "New Description",
        destination: "New Destination",
        travel_type: TravelType.PLANE,
        start_date: "2025-12-01",
        end_date: "2025-12-10",
      };
      const mockCreatedTrip = {
        id: 1,
        ...createTripDto,
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
      };
      mockPrismaService.trip.create.mockResolvedValue(mockCreatedTrip);

      const result = await service.create(createTripDto, 1);

      expect(result).toEqual(mockCreatedTrip);
      expect(mockPrismaService.trip.create).toHaveBeenCalledWith({
        data: {
          name: createTripDto.name,
          description: createTripDto.description,
          destination: createTripDto.destination,
          travel_type: createTripDto.travel_type,
          start_date: new Date(createTripDto.start_date),
          end_date: new Date(createTripDto.end_date),
          coordinator_id: 1,
        },
        include: {
          coordinator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  });

  describe("update", () => {
    it("should update a trip", async () => {
      const updateData = { name: "Updated Trip" };
      const mockUpdatedTrip = {
        id: 1,
        name: "Updated Trip",
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
      };
      mockPrismaService.trip.update.mockResolvedValue(mockUpdatedTrip);

      const result = await service.update(1, updateData);

      expect(result).toEqual(mockUpdatedTrip);
      expect(mockPrismaService.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        include: {
          coordinator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  });

  describe("remove", () => {
    it("should delete a trip", async () => {
      const mockDeletedTrip = { id: 1 };
      mockPrismaService.trip.delete.mockResolvedValue(mockDeletedTrip);

      const result = await service.remove(1);

      expect(result).toEqual(mockDeletedTrip);
      expect(mockPrismaService.trip.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("isCoordinator", () => {
    it("should return true if user is coordinator", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue({
        coordinator_id: 1,
      });

      const result = await service.isCoordinator(1, 1);

      expect(result).toBe(true);
    });

    it("should return false if user is not coordinator", async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue({
        coordinator_id: 2,
      });

      const result = await service.isCoordinator(1, 1);

      expect(result).toBe(false);
    });
  });
});
