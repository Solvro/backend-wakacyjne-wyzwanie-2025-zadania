import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { NotFuture } from "../Validators/not-future.validator";
import { DatabaseService } from "../database/database.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  let database: DatabaseService;
  let Validator: NotFuture;

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

    Validator = new NotFuture();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  // Create
  it("should create a trip", async () => {
    const dto = {
      name: "Test Trip",
      start: new Date("2023-03-26"),
      end: new Date("2024-03-26"),
    };

    mockDatabaseService.trip.create.mockResolvedValue({ undefined });

    await service.create(dto);

    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        start: dto.start,
        end: dto.end,
      },
    });
  });

  // Find All
  it("should find all trips", async () => {
    const trips = [
      {
        id: 1,
        name: "Trip 1",
        start: new Date("2023-03-26"),
        end: new Date("2023-03-26"),
      },
      {
        id: 2,
        name: "Trip 2",
        start: new Date("2023-03-26"),
        end: new Date("2023-03-26"),
      },
    ];
    mockDatabaseService.trip.findMany.mockResolvedValue(trips);

    const result = await service.findAll();

    expect(mockDatabaseService.trip.findMany).toHaveBeenCalled();
    expect(result).toEqual(trips);
  });

  // Find One
  it("should find a trip by id", async () => {
    const trip = {
      id: 1,
      name: "Trip 1",
      start: new Date("2023-03-26"),
      end: new Date("2023-03-26"),
    };
    mockDatabaseService.trip.findUnique.mockResolvedValue(trip);

    const result = await service.findOne(1);

    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(trip);
  });

  // Update
  it("should update a trip", async () => {
    const dto = {
      name: "Updated Trip",
      start: new Date("2023-03-27"),
      end: new Date("2023-03-27"),
    };

    mockDatabaseService.trip.update.mockResolvedValue({ undefined });

    await service.update(1, dto);

    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: dto.name,
        start: dto.start,
        end: dto.end,
      },
    });
  });

  // Remove
  it("should remove a trip", async () => {
    mockDatabaseService.trip.delete.mockResolvedValue({ undefined });

    await service.remove(1);

    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  // NotFuture Validator
  it("NotFuture validator should validate dates correctly", () => {
    const pastDate = new Date("2020-01-01");
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Tomorrow

    expect(
      Validator.validate(pastDate, {
        property: "",
        object: {},
        value: null,
        constraints: [],
        targetName: "",
      }),
    ).toBe(true);
    expect(
      Validator.validate(new Date(), {
        property: "",
        object: {},
        value: null,
        constraints: [],
        targetName: "",
      }),
    ).toBe(true); // Today
    expect(
      Validator.validate(futureDate, {
        property: "",
        object: {},
        value: null,
        constraints: [],
        targetName: "",
      }),
    ).toBe(false);
  });
});
