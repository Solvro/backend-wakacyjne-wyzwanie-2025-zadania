import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { TripStatus } from "../enums/enums";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;
  let service: TripService;

  const mockTripService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findTripsByStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: mockTripService,
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a trip successfully", async () => {
      const createTripDto = {
        name: "Test Trip",
        status: TripStatus.planned,
        start_date: "2025-07-01T00:00:00.000Z",
        end_date: "2025-07-15T00:00:00.000Z",
        location: "Barcelona, Spain",
      };
      const expectedTrip = { id: 1, ...createTripDto };

      mockTripService.create.mockResolvedValue(expectedTrip);

      const result = await controller.create(createTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.create).toHaveBeenCalledWith(createTripDto);
      expect(mockTripService.create).toHaveBeenCalledTimes(1);
    });

    it("should create a trip with minimal data", async () => {
      const createTripDto = {
        name: "Minimal Trip",
        status: TripStatus.planned,
      };
      const expectedTrip = { id: 1, ...createTripDto };

      mockTripService.create.mockResolvedValue(expectedTrip);

      const result = await controller.create(createTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.create).toHaveBeenCalledWith(createTripDto);
    });
  });

  describe("findAll", () => {
    it("should return all trips when no status filter is provided", async () => {
      const expectedTrips = [
        {
          id: 1,
          name: "Trip 1",
          status: TripStatus.planned,
          participants: [],
          expenses: [],
        },
        {
          id: 2,
          name: "Trip 2",
          status: TripStatus.ongoing,
          participants: [],
          expenses: [],
        },
      ];

      mockTripService.findAll.mockResolvedValue(expectedTrips);

      const result = await controller.findAll();

      expect(result).toEqual(expectedTrips);
      expect(mockTripService.findAll).toHaveBeenCalledWith();
      expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
      expect(mockTripService.findTripsByStatus).not.toHaveBeenCalled();
    });

    it("should return trips filtered by status when status query parameter is provided", async () => {
      const status = TripStatus.ongoing;
      const expectedTrips = [
        {
          id: 1,
          name: "Active Trip 1",
          status: TripStatus.ongoing,
          participants: [],
          expenses: [],
        },
      ];

      mockTripService.findTripsByStatus.mockResolvedValue(expectedTrips);

      const result = await controller.findAll(status);

      expect(result).toEqual(expectedTrips);
      expect(mockTripService.findTripsByStatus).toHaveBeenCalledWith(status);
      expect(mockTripService.findTripsByStatus).toHaveBeenCalledTimes(1);
      expect(mockTripService.findAll).not.toHaveBeenCalled();
    });

    it("should return empty array when no trips exist", async () => {
      mockTripService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(mockTripService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a trip by id", async () => {
      const tripId = "1";
      const expectedTrip = {
        id: 1,
        name: "Test Trip",
        status: TripStatus.planned,
        participants: [{ id: 1, name: "John", email: "john@example.com" }],
        expenses: [{ id: 1, amount: 100, description: "Hotel" }],
      };

      mockTripService.findOne.mockResolvedValue(expectedTrip);

      const result = await controller.findOne(tripId);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.findOne).toHaveBeenCalledWith(1);
      expect(mockTripService.findOne).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion", async () => {
      const tripId = "999";
      const expectedTrip = {
        id: 999,
        name: "Test Trip",
        status: TripStatus.planned,
      };

      mockTripService.findOne.mockResolvedValue(expectedTrip);

      const result = await controller.findOne(tripId);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe("update", () => {
    it("should update a trip successfully", async () => {
      const tripId = "1";
      const updateTripDto = {
        name: "Updated Trip",
        status: TripStatus.ongoing,
      };
      const expectedTrip = { id: 1, ...updateTripDto };

      mockTripService.update.mockResolvedValue(expectedTrip);

      const result = await controller.update(tripId, updateTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.update).toHaveBeenCalledWith(1, updateTripDto);
      expect(mockTripService.update).toHaveBeenCalledTimes(1);
    });

    it("should handle partial updates", async () => {
      const tripId = "1";
      const updateTripDto = { name: "Only Name Updated" };
      const expectedTrip = {
        id: 1,
        name: "Only Name Updated",
        status: TripStatus.planned,
      };

      mockTripService.update.mockResolvedValue(expectedTrip);

      const result = await controller.update(tripId, updateTripDto);

      expect(result).toEqual(expectedTrip);
      expect(mockTripService.update).toHaveBeenCalledWith(1, updateTripDto);
    });
  });

  describe("remove", () => {
    it("should delete a trip successfully", async () => {
      const tripId = "1";
      const deletedTrip = {
        id: 1,
        name: "Deleted Trip",
        status: TripStatus.planned,
      };

      mockTripService.remove.mockResolvedValue(deletedTrip);

      const result = await controller.remove(tripId);

      expect(result).toEqual(deletedTrip);
      expect(mockTripService.remove).toHaveBeenCalledWith(1);
      expect(mockTripService.remove).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion for deletion", async () => {
      const tripId = "999";
      const deletedTrip = {
        id: 999,
        name: "Deleted Trip",
        status: TripStatus.planned,
      };

      mockTripService.remove.mockResolvedValue(deletedTrip);

      const result = await controller.remove(tripId);

      expect(result).toEqual(deletedTrip);
      expect(mockTripService.remove).toHaveBeenCalledWith(999);
    });
  });
});
