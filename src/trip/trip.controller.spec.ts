import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import type { CreateTripResponseDto } from "./dto/create-trip-response.dto";
import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(
      (dto: CreateTripDto): CreateTripResponseDto => ({
        id: Date.now(),
        destination: dto.destination,
        description: dto.description,
        start_date: dto.start_date,
        end_date: dto.end_date,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    ),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn((id: number, dto: UpdateTripDto) => ({
      id,
      destination: dto.destination,
      description: dto.description,
      start_date: dto.start_date,
      end_date: dto.end_date,
      created_at: new Date(),
      updated_at: new Date(),
    })),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        TripService,
        {
          provide: AuthService,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const dto = {
      id: 1,
      destination: "Tilsonburg",
      description: "Beanz trip",
      start_date: new Date("2023-06-01T10:00:00Z"),
      end_date: new Date("2023-06-05T18:00:00Z"),
    };
    const result = await controller.create(dto);
    expect(result).toHaveProperty("id", expect.any(Number));
    expect(result).toHaveProperty("destination", dto.destination);
    expect(result).toHaveProperty("description", dto.description);
    expect(result).toHaveProperty("start_date", dto.start_date);
    expect(result).toHaveProperty("end_date", dto.end_date);
    expect(result).toHaveProperty("created_at", expect.any(Date));
    expect(result).toHaveProperty("updated_at", expect.any(Date));

    expect(mockTripService.create).toHaveBeenCalledWith(dto);
    expect(mockTripService.create).toHaveBeenCalledTimes(1);
  });

  it("should update a trip", async () => {
    const dto = {
      destination: "Tilsonburg",
      description: "Beanza",
      start_date: new Date("2023-06-01T10:00:00Z"),
      end_date: new Date("2023-06-05T18:00:00Z"),
    };

    const result = await controller.update("1", dto);

    expect(result.destination).toBe(dto.destination);
    expect(result.description).toBe(dto.description);
    expect(result.start_date).toBe(dto.start_date);
    expect(result.end_date).toBe(dto.end_date);
    expect(result).toHaveProperty("created_at", expect.any(Date));
    expect(result).toHaveProperty("updated_at", expect.any(Date));
    expect(result).toHaveProperty("id", expect.any(Number));
  });

  it("should return all trips", async () => {
    const trips = [
      {
        id: 1,
        destination: "Tilsonburg",
        description: "Beanz trip",
        start_date: new Date("2023-06-01T10:00:00Z"),
        end_date: new Date("2023-06-05T18:00:00Z"),
        created_at: new Date("2023-05-01T09:00:00Z"),
        updated_at: new Date("2023-05-10T14:30:00Z"),
      },
      {
        id: 2,
        destination: "Monachium",
        description: "Oktoberfest vibes",
        start_date: new Date("2023-09-20T08:00:00Z"),
        end_date: new Date("2023-09-30T22:00:00Z"),
        created_at: new Date("2023-08-15T12:00:00Z"),
        updated_at: new Date("2023-08-25T16:45:00Z"),
      },
    ];

    mockTripService.findAll.mockResolvedValue(trips);

    const result = await controller.findAll();

    expect(result).toEqual(trips);
    expect(mockTripService.findAll).toHaveBeenCalled();
  });

  it("should remove a trip", async () => {
    await controller.remove("1");
    expect(mockTripService.remove).toHaveBeenCalledWith(1);
  });
});
