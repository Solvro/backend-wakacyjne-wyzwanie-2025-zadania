import { mock } from "node:test";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  let tripCounter = 1;

  let tripsInMemory: {
    id: number;
    destination: string;
    participant: { connect: { participantId: number } };
    startDate: Date;
    endDate: Date;
  }[] = [];

  const initialTrips = [
    {
      id: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 2,
      destination: "B",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  interface Trip {
    data: {
      participant: {
        connect: { participantId: number };
      };
      destination: string;
      startDate: Date;
      endDate: Date;
    };
  }

  const mockDatabaseService = {
    trip: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Trip) => {
        const newTrip = { id: tripCounter++, ...data };
        tripsInMemory.push(newTrip);
        return newTrip;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
    participant: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    mockDatabaseService.participant.findUnique.mockResolvedValue({
      participantId: 1,
      firstName: "Test",
      lastName: "User",
    });

    tripsInMemory = [...initialTrips];
    tripCounter = initialTrips.length + 1;

    service = module.get<TripService>(TripService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new trip", async () => {
    const dto = {
      participantId: 1,
      destination: "Testing Area",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");

    expect(result.destination).toBe("Testing Area");

    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: {
        destination: dto.destination,
        startDate: dto.startDate,
        endDate: dto.endDate,
        participant: { connect: { participantId: dto.participantId } },
      },
    });

    expect(result).toEqual({
      // new trip id == 3
      id: 3,
      participant: {
        connect: {
          participantId: 1,
        },
      },
      destination: "Testing Area",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    });
  });

  it("should return list of all trips", async () => {
    const tripsMock = [...tripsInMemory];
    mockDatabaseService.trip.findMany.mockResolvedValue(tripsMock);
    const result = await service.findAll();

    expect(result).toEqual(tripsMock);
    expect(mockDatabaseService.trip.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one trip", async () => {
    const tripMock = {
      id: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    };

    mockDatabaseService.trip.findUnique.mockResolvedValue(tripMock);
    const result = await service.findOne(1);

    expect(result).toEqual(tripMock);
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a trip", async () => {
    const dto = {
      participantId: 1,
      destination: "Testing Area",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };
    const tripMock = await service.create(dto); // id == 3

    const tripUpdated = {
      id: tripMock.tripId,
      participantId: 1,
      destination: "C",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };

    const dtoUpdate = {
      destination: "C",
    };

    mockDatabaseService.trip.update.mockResolvedValue(tripUpdated);

    const result = await service.update(tripMock.tripId, dtoUpdate);

    expect(mockDatabaseService.trip.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tripUpdated);
    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { tripId: tripMock.tripId },
      data: dtoUpdate,
    });
  });

  it("should delete a trip", async () => {
    const tripMock = {
      id: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    };

    mockDatabaseService.trip.delete.mockResolvedValue(tripMock);

    const result = await service.remove(1);

    expect(result).toEqual(tripMock);
    expect(mockDatabaseService.trip.delete).toHaveBeenCalled();
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { tripId: 1 },
    });
  });
});
