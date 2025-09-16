import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validTrip } from "../../test/test-utils";
import { AuthGuard } from "../auth/auth.guard";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TripController>(TripController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new trip", async () => {
    const dto = validTrip();
    const expected = {
      id: 1,
      ...dto,
    };

    mockTripService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(mockTripService.create).toHaveBeenCalledWith(dto);
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

    mockTripService.findAll.mockResolvedValue(mockTrips);

    const result = await controller.findAll();

    expect(result).toEqual(mockTrips);
    expect(result.length).toEqual(mockTrips.length);
  });

  it("should return a single trip with given id", async () => {
    const expected = {
      id: 1,
      ...validTrip(),
    };

    mockTripService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne("1");

    expect(result).toEqual(expected);
    expect(mockTripService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a trip", async () => {
    const expected = {
      id: 1,
      ...validTrip(),
    };
    mockTripService.update.mockResolvedValue(expected);

    const result = await controller.update("1", { name: "testTrip22" });

    expect(result).toEqual(expected);
    expect(mockTripService.update).toHaveBeenCalledWith(1, {
      name: "testTrip22",
    });
  });

  it("should delete a trip", async () => {
    const expected = {
      id: 1,
      ...validTrip(),
    };

    mockTripService.remove.mockResolvedValue(expected);

    const result = await controller.remove("1");

    expect(result).toEqual(expected);
    expect(mockTripService.remove).toHaveBeenCalledWith(1);
  });
});
