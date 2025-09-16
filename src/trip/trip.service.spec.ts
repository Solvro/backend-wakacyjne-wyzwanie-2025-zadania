import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateTripDto } from "./dto/create-trip.dto";
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

  it("should create a trip", async () => {
    const dto: CreateTripDto = {
      title: "Test Trip",
      description: "",
      startDate: new Date("2025-07-01").toString(),
      endDate: new Date("2025-07-15").toString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    const mockTrip = { id: 1, ...dto };

    mockDatabaseService.trip.create.mockResolvedValue(mockTrip);

    const result = await service.create(dto);

    expect(result).toEqual(mockTrip);
    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: {
        title: dto.title,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  });

  it("should return all trips", async () => {
    const trips = [
      {
        id: 1,
        title: "Trip 1",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 2,
        title: "Trip 2",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    mockDatabaseService.trip.findMany.mockResolvedValue(trips);

    const result = await service.findAll();

    expect(result).toEqual(trips);
    expect(mockDatabaseService.trip.findMany).toHaveBeenCalled();
  });

  it("should return one trip", async () => {
    const trip = {
      id: 1,
      title: "Trip 1",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };

    mockDatabaseService.trip.findUnique.mockResolvedValue(trip);

    const result = await service.findOne(1);

    expect(result).toEqual(trip);
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should update a trip", async () => {
    const mockTrip = {
      id: 1,
      title: "Old Title",
      description: "Old description",
      startDate: new Date("2025-07-01"),
      endDate: new Date("2025-07-15"),
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    mockDatabaseService.trip.update.mockImplementation((arguments_) => ({
      ...mockTrip,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...arguments_.data,
    }));

    const result = await service.update(1, { title: "New Title" });

    expect(result.id).toBe(1);
    expect(result.title).toBe("New Title");

    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: "New Title" },
    });
  });

  it("should remove a trip", async () => {
    const trip = {
      id: 1,
      title: "Trip to delete",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };

    mockDatabaseService.trip.delete.mockResolvedValue(trip);

    const result = await service.remove(1);

    expect(result).toEqual(trip);
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
