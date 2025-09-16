import { DatabaseService } from "src/database/database.service";
import type { PaginationDto } from "src/pagination/pagination.dto";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let database: DatabaseService;

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
    database = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should found one trip by id", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    mockDatabaseService.trip.findUnique.mockResolvedValue(dto);

    const result = await service.findOne(1);

    expect(result).toHaveProperty("trip_id", 1);
    expect(result.name).toBe("Wycieczka");
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
      where: { trip_id: 1 },
    });
  });

  it("should find all trips", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    const dto1 = {
      trip_id: 2,
      name: "Wycieczka 1",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka 1",
    };

    mockDatabaseService.trip.findMany.mockResolvedValue([dto, dto1]);

    const paginationDto: PaginationDto = { limit: 10, skip: 0 };
    const result = await service.findAll(paginationDto);

    expect(result).toHaveLength(2);
    expect(result).toEqual([dto, dto1]);
    expect(mockDatabaseService.trip.findMany).toHaveBeenCalled();
  });

  it("should create trip", async () => {
    const dto = {
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    mockDatabaseService.trip.create.mockResolvedValue({
      trip_id: 1,
      ...dto,
    });

    const result = await service.create(dto);

    expect(result).toHaveProperty("trip_id");
    expect(result.name).toBe("Wycieczka");
    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({ data: dto });
    expect(await service.create(dto)).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      trip_id: expect.any(Number),
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    });
  });

  it("should delete record", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    mockDatabaseService.trip.delete.mockResolvedValue(dto);

    const result = await service.remove(1);

    expect(result).toHaveProperty("trip_id");
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { trip_id: 1 },
    });
  });

  it("should update a trip", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    mockDatabaseService.trip.create.mockResolvedValue(dto);

    const resultCreate = await service.create(dto);

    expect(resultCreate.description).toBe("Super fajowa wycieczka");

    const dtoUpdate = {
      description: "super wycieczka updejt",
    };

    const updatedTrip = { ...dto, ...dtoUpdate };

    mockDatabaseService.trip.update.mockResolvedValue(updatedTrip);

    const result = await service.update(dto.trip_id, dtoUpdate);

    expect(result.description).toBe("super wycieczka updejt");
  });
});
