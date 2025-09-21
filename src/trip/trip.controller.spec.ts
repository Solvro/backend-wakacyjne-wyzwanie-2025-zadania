import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let tripController: TripController;
  const mockService = {
    getAllTrips: jest.fn(),
    createTrip: jest.fn(),
    updateTrip: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: mockService,
        },
      ],
    }).compile();

    tripController = module.get<TripController>(TripController);
  });

  afterEach(() => jest.clearAllMocks());

  it("getAllTrips calls service", async () => {
    mockService.getAllTrips.mockResolvedValue([]);
    await expect(tripController.getAllTrips()).resolves.toEqual([]);
    expect(mockService.getAllTrips).toHaveBeenCalled();
  });

  it("createTrip delegates to service", async () => {
    const dto = { name: "t", startDate: new Date("2026-07-01") };
    mockService.createTrip.mockResolvedValue({ id: 1, ...dto });
    await expect(tripController.createTrip(dto)).resolves.toMatchObject({
      id: 1,
    });
    expect(mockService.createTrip).toHaveBeenCalledWith(dto);
  });

  it("updateTrip delegates to service", async () => {
    mockService.updateTrip.mockResolvedValue({ id: 1 });
    await expect(
      tripController.updateTrip(1, { name: "x" }),
    ).resolves.toMatchObject({ id: 1 });
    expect(mockService.updateTrip).toHaveBeenCalledWith(1, { name: "x" });
  });
});
