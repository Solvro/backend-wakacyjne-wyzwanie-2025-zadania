import { TripStatus } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import { createMockTripsService } from "../test/test-utils";
import type {
  CreateTripDto,
  UpdateTripDto,
  UpdateTripStatusDto,
} from "./dto/trip.dto";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

describe("TripsController", () => {
  let controller: TripsController;

  // Using centralized mock instead of inline declaration
  const mockTripsService = createMockTripsService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TripsController>(TripsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTrips", () => {
    it("should delegate to TripsService.findAll", async () => {
      await controller.getAllTrips();
      expect(mockTripsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getTripById", () => {
    it("should delegate to TripsService.findOne", async () => {
      await controller.getTripById(1);
      expect(mockTripsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("createTrip", () => {
    it("should delegate to TripsService.create", async () => {
      const createTripDto: CreateTripDto = {
        name: "New Trip",
        description: "A new adventure",
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        budget: 150_000,
      };

      await controller.createTrip(createTripDto);
      expect(mockTripsService.create).toHaveBeenCalledWith(createTripDto);
    });
  });

  describe("updateTrip", () => {
    it("should delegate to TripsService.update", async () => {
      const updateTripDto: UpdateTripDto = {
        name: "Updated Trip",
        description: "Updated description",
        status: TripStatus.ACTIVE,
        startDate: "2025-08-01",
        endDate: "2025-08-15",
        budget: 200_000,
      };

      await controller.updateTrip(1, updateTripDto);
      expect(mockTripsService.update).toHaveBeenCalledWith(1, updateTripDto);
    });
  });

  describe("updateTripStatus", () => {
    it("should delegate to TripsService.updateStatus", async () => {
      const updateTripStatusDto: UpdateTripStatusDto = {
        status: TripStatus.ACTIVE,
      };

      await controller.updateTripStatus(1, updateTripStatusDto);
      expect(mockTripsService.updateStatus).toHaveBeenCalledWith(
        1,
        TripStatus.ACTIVE,
      );
    });
  });

  describe("deleteTrip", () => {
    it("should delegate to TripsService.remove", async () => {
      mockTripsService.remove.mockResolvedValue({});

      await controller.deleteTrip(1);

      expect(mockTripsService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe("getTripSummary", () => {
    it("should delegate to TripsService.getTripSummary", async () => {
      await controller.getTripSummary(1);
      expect(mockTripsService.getTripSummary).toHaveBeenCalledWith(1);
    });
  });
});
