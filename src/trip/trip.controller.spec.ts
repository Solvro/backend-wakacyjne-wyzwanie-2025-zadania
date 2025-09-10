import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import type { PaginationDto } from "src/pagination/pagination.dto";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
      imports: [AuthModule, DatabaseModule],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create new record", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };
    mockTripService.create.mockReturnValue(dto);

    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(mockTripService.create).toHaveBeenCalledTimes(1);
  });

  it("should update an existing record", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };
    mockTripService.create.mockReturnValue(dto);

    const resultCreate = await controller.create(dto);

    expect(resultCreate.description).toBe("Super fajowa wycieczka");

    const dtoUpdate = {
      description: "Super fajowy updejt",
    };

    const updateTrip = { ...dto, ...dtoUpdate };

    mockTripService.update.mockReturnValue(updateTrip);

    const result = await controller.update(dto.trip_id, dtoUpdate);

    expect(result.description).toBe("Super fajowy updejt");
    expect(mockTripService.create).toHaveBeenCalled();
    expect(mockTripService.update).toHaveBeenCalledTimes(1);
  });

  it("should find one record by id", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };

    mockTripService.findOne.mockReturnValue(dto);

    const result = await controller.findOne(1);

    expect(result).toHaveProperty("trip_id", 1);
    expect(mockTripService.findOne).toHaveBeenCalledWith(1);
    expect(mockTripService.findOne).toHaveBeenCalled();
    expect(mockTripService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should find many records", async () => {
    const dto = {
      trip_id: 1,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };
    const dto2 = {
      trip_id: 2,
      name: "Wycieczka",
      date_start: "2025-09-09T00:00:00Z",
      date_end: "2025-09-10T00:00:00Z",
      description: "Super fajowa wycieczka",
    };
    mockTripService.findAll.mockReturnValue([dto, dto2]);
    const paginationDto: PaginationDto = { limit: 10, skip: 0 };
    const result = await controller.findAll(paginationDto);

    expect(result).toHaveLength(2);
    expect(mockTripService.findAll).toHaveBeenCalled();
    expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
  });
});
