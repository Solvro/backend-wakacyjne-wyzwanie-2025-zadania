import { Test, TestingModule } from "@nestjs/testing";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  interface Trip {
    id: number;
    startDate: Date;
    endDate: Date;
    location: string;
  }

  let tripCounter = 1;

  const initialTrips: Trip[] = [
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
      location: "London",
    },
  ];

  const mockTripService = {
    create: jest.fn(({ data }: { data: Trip }) => {
      const newTrip: Trip = {
        id: tripCounter++,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
      };
      return newTrip;
    }) as jest.Mock,
    findAll: jest.fn().mockResolvedValue(initialTrips),
    findOne: jest.fn().mockResolvedValue(initialTrips[0]),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [{ provide: TripService, useValue: mockTripService }],
    }).compile();

    tripCounter = initialTrips.length + 1;
    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto = {
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-03-10"),
      location: "New York",
    };

    const expectedValue = { id: tripCounter, ...dto };
    mockTripService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);
    expect(mockTripService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all trips", async () => {
    const result = await controller.findAll();

    expect(result).toEqual(initialTrips);
    expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one trip", async () => {
    const tripMock = initialTrips[0];

    const result = await controller.findOne(1);

    expect(result).toEqual(tripMock);
    expect(mockTripService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a trip", async () => {
    const dto = {
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-03-10"),
      location: "New York",
    };

    const tripMock = await controller.create(dto);

    const dtoUpdate = { location: "Los Angeles" };
    const tripUpdated = { ...tripMock, ...dtoUpdate };

    mockTripService.update.mockResolvedValue(tripUpdated);

    const result = await controller.update(String(tripMock.id), dtoUpdate);

    expect(mockTripService.update).toHaveBeenCalledWith(tripMock.id, dtoUpdate);
    expect(result).toEqual(tripUpdated);
  });

  it("should delete a trip", async () => {
    const tripMock = initialTrips[0];

    await controller.remove(String(tripMock.id));

    expect(mockTripService.remove).toHaveBeenCalledWith(tripMock.id);
  });
});
