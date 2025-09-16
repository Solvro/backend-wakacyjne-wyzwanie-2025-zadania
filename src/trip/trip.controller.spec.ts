import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  let tripCounter = 1;

  let tripsInMemory: {
    tripId: number;
    destination: string;
    participant: { connect: { participantId: number } };
    startDate: Date;
    endDate: Date;
  }[] = [];

  const initialTrips = [
    {
      tripId: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      tripId: 2,
      destination: "B",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  interface Trip {
    data: {
      participant: {
        connect: { participantId: number };
      };
      destination: string;
      startDate: Date;
      endDate: Date;
    };
  }
  const mockTripService = {
    create: jest.fn(({ data }: Trip) => {
      const newTrip = { tripId: tripCounter++, ...data };
      tripsInMemory.push(newTrip);
      return newTrip;
    }) as jest.Mock,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        { provide: TripService, useValue: mockTripService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    tripsInMemory = [...initialTrips];
    tripCounter = initialTrips.length + 1;

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto = {
      participantId: 1,
      destination: "Testing Area",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };

    const expectedValue = { tripId: tripCounter, ...dto };
    mockTripService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);

    expect(mockTripService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all trips", async () => {
    const tripsMock = [...tripsInMemory];

    mockTripService.findAll.mockResolvedValue(tripsMock);

    const result = await controller.findAll();

    expect(result).toEqual(tripsMock);
    expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one trip", async () => {
    const tripMock = {
      tripId: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    };

    mockTripService.findOne.mockResolvedValue(tripMock);
    const result = await controller.findOne(1);

    expect(result).toEqual(tripMock);
    expect(mockTripService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should update a trip", async () => {
    const dto = {
      participantId: 1,
      destination: "Testing Area",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };
    const tripMock = await controller.create(dto); // id == 3

    const tripUpdated = {
      tripId: tripMock.tripId,
      participantId: 1,
      destination: "C",
      startDate: new Date("2025-07-01T00:00:00.000Z"),
      endDate: new Date("2025-08-01T00:00:00.000Z"),
    };

    const dtoUpdate = {
      destination: "C",
    };

    mockTripService.update.mockResolvedValue(tripUpdated);

    const result = await controller.update(tripMock.tripId, dtoUpdate);

    expect(mockTripService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tripUpdated);
    expect(mockTripService.update).toHaveBeenCalledWith(3, dtoUpdate);
  });

  it("should delete a trip", async () => {
    const tripMock = {
      tripId: 1,
      destination: "A",
      participant: { connect: { participantId: 1 } },
      startDate: new Date(),
      endDate: new Date(),
    };

    mockTripService.remove.mockResolvedValue(tripMock);

    const result = await controller.remove(1);

    expect(result).toEqual(tripMock);
    expect(mockTripService.remove).toHaveBeenCalled();
    expect(mockTripService.remove).toHaveBeenCalledWith(1);
  });
});
