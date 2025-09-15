import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import type { CreateTripDto } from "./dto/create-trip.dto";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;

  const mockPrismaService = {
    trip: {
      create: jest.fn(({ data }: { data: CreateTripDto }) => {
        return {
          id: Date.now(),
          destination: data.destination,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          created_at: new Date(),
          updated_at: new Date(),
        } as CreateTripResponseDto;
      }),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
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
    const dto = {
      destination: "Tilsonburg",
      description: "Beanz",
      start_date: new Date(),
      end_date: new Date(),
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty("id", expect.any(Number));
    expect(result).toHaveProperty("destination");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("start_date");
    expect(result).toHaveProperty("end_date");
    expect(result).toHaveProperty("created_at", expect.any(Date));
    expect(result).toHaveProperty("updated_at", expect.any(Date));
    expect(result.description).toEqual("Beanz");
  });

  it("should return all trips", async () => {
    const trips = [
      {
        id: 1,
        destination: "Tilsonburg",
        description: "beanz",
        start_date: new Date("2023-01-05T10:00:00Z"),
        end_date: new Date("2023-01-06T10:00:00Z"),
        created_at: new Date("2023-01-02T10:00:00Z"),
        updated_at: new Date("2023-01-02T10:00:00Z"),
      },
      {
        id: 2,
        destination: "Monachium",
        description: "beanz?",
        start_date: new Date("2023-01-05T10:00:00Z"),
        end_date: new Date("2023-01-06T10:00:00Z"),
        created_at: new Date("2023-01-02T10:00:00Z"),
        updated_at: new Date("2023-01-02T10:00:00Z"),
      },
    ];
    mockPrismaService.trip.findMany.mockResolvedValue(trips);

    const result = await service.findAll();
    expect(result).toBe(trips);
    expect(mockPrismaService.trip.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return a trip by id", async () => {
    const trip = {
      id: 1,
      destination: "Tilsonburg",
      description: "beanz",
      start_date: new Date("2023-01-05T10:00:00Z"),
      end_date: new Date("2023-01-06T10:00:00Z"),
      created_at: new Date("2023-01-02T10:00:00Z"),
      updated_at: new Date("2023-01-02T10:00:00Z"),
    };
    mockPrismaService.trip.findUnique.mockResolvedValue(trip);

    const result = await service.findOne(1);
    expect(result).toBe(trip);
    expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
  it("should update a trip", async () => {
    const trip = {
      id: 1,
      destination: "Tilsonburg",
      description: "beanz",
      start_date: new Date("2023-01-05T10:00:00Z"),
      end_date: new Date("2023-01-06T10:00:00Z"),
      created_at: new Date("2023-01-02T10:00:00Z"),
      updated_at: new Date("2023-01-02T10:00:00Z"),
    };
    const updateData = { description: "morebeanz" };
    mockPrismaService.trip.update.mockResolvedValue({ ...trip, ...updateData });

    const result = await service.update(1, updateData);
    expect(result).toEqual({ ...trip, ...updateData });
    expect(mockPrismaService.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
  });

  it("should delete a trip", async () => {
    const trip = {
      id: 1,
      name: "John Doe",
      email: "johnmarchewka@gmailcom",
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPrismaService.trip.delete.mockResolvedValue(trip);

    const result = await service.remove(1);
    expect(result).toBe(trip);
    expect(mockPrismaService.trip.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
