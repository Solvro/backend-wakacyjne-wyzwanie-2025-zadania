import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validTrip } from "../../test/test-utils";
import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("ExpenseService", () => {
  let service: TripService;

  const mockDatabaseService = {
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
      providers: [TripService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<TripService>(TripService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new trip", async () => {
    const dto = validTrip();

    const createdTrip = {
      id: 1,
      ...dto,
    };

    mockDatabaseService.trip.create.mockResolvedValue(createdTrip);

    const result = await service.create(dto);

    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: {
        ...dto,
      },
    });

    expect(result).toEqual(createdTrip);
  });

  it("should return all trips", async () => {
    const mockTrips = [
      {
        id: 1,
        ...validTrip(),
      },
      {
        id: 2,
        ...validTrip(),
      },
    ];

    mockDatabaseService.trip.findMany.mockResolvedValue(mockTrips);

    const result = await service.findAll();

    expect(result.length).toEqual(mockTrips.length);
    expect(result).toEqual(mockTrips);
  });

  it("should return a single trip", async () => {
    const mockTrip = {
      id: 3,
      ...validTrip(),
    };

    mockDatabaseService.trip.findUnique.mockResolvedValue(mockTrip);

    const result = await service.findOne(3);
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(result).toEqual(mockTrip);
  });

  it("should update a trip", async () => {
    const updatedTrip = {
      id: 1,
      ...validTrip(),
      name: "updatedTestTrip",
    };

    const existingTrip = {
      id: 1,
      ...validTrip(),
    };

    mockDatabaseService.trip.findUnique.mockResolvedValue(existingTrip);
    mockDatabaseService.trip.update.mockResolvedValue(updatedTrip);

    const result = await service.update(1, { name: "updatedTestTrip" });

    expect(result).toEqual(updatedTrip);
    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: "updatedTestTrip",
      },
    });
  });

  it("should delete a trip", async () => {
    const deletedTrip = {
      id: 1,
      ...validTrip(),
    };
    mockDatabaseService.trip.delete.mockResolvedValue(deletedTrip);

    const result = await service.remove(1);

    expect(result).toEqual(deletedTrip);
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
