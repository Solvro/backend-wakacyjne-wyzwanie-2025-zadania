/* eslint-disable @typescript-eslint/unbound-method */
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/role/role.guard";
import type { TripResponseDto } from "./dto/trip-response.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

describe("TripsController", () => {
  let controller: TripsController;
  let service: jest.Mocked<TripsService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const mockRoleGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        { provide: TripsService, useValue: mockService },
        { provide: AuthService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get(TripsService);
  });

  describe("findAll", () => {
    it("should return all trips", async () => {
      const trips = [{ id: 1 } as TripResponseDto];
      service.findAll.mockResolvedValue(trips);
      expect(await controller.findAll()).toBe(trips);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a trip by id", async () => {
      const trip = { id: 1 };
      service.findOne.mockResolvedValue(trip as TripResponseDto);
      expect(await controller.findOne(1)).toBe(trip);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should return null if trip not found", async () => {
      service.findOne.mockResolvedValue(null);
      expect(await controller.findOne(1)).toBeNull();
    });
  });

  describe("update", () => {
    it("should update trip", async () => {
      const dto: UpdateTripDto = {
        destination: "example",
        description: "example",
        start: "2025-07-01",
        end: "2025-07-10",
      };
      const trip = { id: 1 };
      service.update.mockResolvedValue(trip as TripResponseDto);
      expect(await controller.update(1, dto)).toBe(trip);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove trip by id", async () => {
      const trip = { id: 1 };
      service.remove.mockResolvedValue(trip as TripResponseDto);
      expect(await controller.remove(1)).toBe(trip);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
