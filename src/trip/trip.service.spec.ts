import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  let database: DatabaseService;

  let tripCounter = 1;

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
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(({ data }: Trip) => ({
        id: tripCounter++,
        participant: data.participant,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
      })),
      update: jest.fn(),
      remove: jest.fn(),
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

    service = module.get<TripService>(TripService);
    database = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new trip", async () => {
    mockDatabaseService.participant.findUnique.mockResolvedValue({
      participantId: 1,
      firstName: "Test",
      lastName: "User",
    });

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
      id: 1,
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
});
