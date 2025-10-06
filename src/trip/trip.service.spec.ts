import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  const initialTrips = [
    {
      id: 1,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-10"),
      location: "Paris",
    },
    {
      id: 2,
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-02-10"),
      location: "Berlin",
    },
  ];

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

    mockDatabaseService.trip.findUnique.mockResolvedValueOnce(initialTrips[0]);
    mockDatabaseService.trip.findMany.mockResolvedValue(initialTrips);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new trip", async () => {
    const dto: CreateTripDto = {
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-03-10"),
      location: "New York",
    };

    const createdTrip = {
      id: 3,
      ...dto,
    };

    mockDatabaseService.trip.create.mockResolvedValue(createdTrip);

    const result = await service.create(dto);

    expect(result).toEqual(createdTrip);
    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it("should return all trips", async () => {
    const result = await service.findAll();
    expect(result).toEqual(initialTrips);
    expect(mockDatabaseService.trip.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one trip", async () => {
    const tripMock = initialTrips[0];

    mockDatabaseService.trip.findUnique.mockResolvedValue(tripMock);

    const result = await service.findOne(1);

    expect(result).toEqual(tripMock);
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a trip", async () => {
    const dto: UpdateTripDto = {
      startDate: new Date("2023-04-01"),
      endDate: new Date("2023-04-10"),
      location: "Tokyo",
    };

    const tripMock = initialTrips[0];

    const updatedTrip = {
      ...tripMock,
      ...dto,
    };

    mockDatabaseService.trip.update.mockResolvedValue(updatedTrip);

    const result = await service.update(tripMock.id, dto);

    expect(mockDatabaseService.trip.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedTrip);
    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { id: tripMock.id },
      data: dto,
    });
  });

  it("should delete a trip", async () => {
    const tripMock = initialTrips[0];

    mockDatabaseService.trip.delete.mockResolvedValue(undefined);

    await expect(service.remove(tripMock.id)).resolves.toBeUndefined();

    expect(mockDatabaseService.trip.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { id: tripMock.id },
    });
  });
});
