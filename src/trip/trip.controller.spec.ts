import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "src/auth/dto/request-with-user.dto";
import { RoleGuard } from "src/auth/roles/role.guard";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

class MockAuthGuard {
  canActivate() {
    return true;
  }
}

class MockRoleGuard {
  canActivate() {
    return true;
  }
}

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRequest: Partial<RequestWithUser> = {
    user: { userId: 1, email: "test@example.com", role: Role.ADMIN },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [{ provide: TripService, useValue: mockTripService }],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .overrideGuard(RoleGuard)
      .useClass(MockRoleGuard)
      .compile();

    controller = module.get<TripController>(TripController);
  });

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create a trip", async () => {
      const dto: CreateTripDto = {
        description: "Paris Trip",
        destination: "Paris",
        startDate: "2025-06-04",
        endDate: "2025-06-10",
      };
      const result = {
        trip_id: 1,
        destination: dto.destination,
        description: dto.description,
        start_date: dto.startDate,
        end_date: dto.endDate,
      };

      mockTripService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockTripService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("should return private trip data for logged-in user", async () => {
      const trips = [{ trip_id: 1, name: "Trip 1" }];
      mockTripService.findAll.mockResolvedValue(trips);

      const response = await controller.findAll(mockRequest as RequestWithUser);
      expect(response).toEqual(trips);
      expect(mockTripService.findAll).toHaveBeenCalled();
    });

    it("should return public trip data if no user in request", async () => {
      const trips = [{ trip_id: 1, name: "Trip 1" }];
      mockTripService.findAll.mockResolvedValue(trips);

      const response = await controller.findAll({} as RequestWithUser);
      expect(response).toEqual(trips);
      expect(mockTripService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return private trip data for logged-in user", async () => {
      const trip = { trip_id: 1, name: "Trip 1" };
      mockTripService.findOne.mockResolvedValue(trip);

      const response = await controller.findOne(
        1,
        mockRequest as RequestWithUser,
      );
      expect(response).toEqual(trip);
      expect(mockTripService.findOne).toHaveBeenCalledWith(1);
    });

    it("should return public trip data if no user in request", async () => {
      const trip = { trip_id: 1, name: "Trip 1" };
      mockTripService.findOne.mockResolvedValue(trip);

      const response = await controller.findOne(1, {} as RequestWithUser);
      expect(response).toEqual(trip);
      expect(mockTripService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a trip", async () => {
      const dto: UpdateTripDto = { description: "Updated Trip" };
      const result = {
        trip_id: 1,
        destination: "Paris",
        description: dto.description,
        start_date: "2025-06-04",
        end_date: "2025-06-10",
      };

      mockTripService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(mockTripService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove a trip", async () => {
      const result = { message: "Trip deleted successfully" };
      mockTripService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockTripService.remove).toHaveBeenCalledWith(1);
    });
  });
});
