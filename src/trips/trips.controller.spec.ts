import { TravelType } from "@prisma/client";

import { ForbiddenException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import type { UserResponseDto } from "../users/dto/user-response.dto";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

describe("TripsController", () => {
  let controller: TripsController;

  const mockTripsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    isCoordinator: jest.fn(),
  };

  const mockAuthService = {
    validateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all trips", async () => {
      const mockTrips = [
        {
          id: 1,
          name: "Trip 1",
          description: "Description 1",
          destination: "Destination 1",
          travel_type: TravelType.PLANE,
          start_date: new Date(),
          end_date: new Date(),
          coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
        },
      ];
      mockTripsService.findAll.mockResolvedValue(mockTrips);

      const result = await controller.findAll();

      expect(result).toEqual(mockTrips);
      expect(mockTripsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a trip by id", async () => {
      const mockTrip = {
        id: 1,
        name: "Trip 1",
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
        expenses: [],
      };
      mockTripsService.findOne.mockResolvedValue(mockTrip);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockTrip);
      expect(mockTripsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("create", () => {
    it("should create a new trip", async () => {
      const createTripDto = {
        name: "New Trip",
        description: "New Description",
        destination: "New Destination",
        travel_type: TravelType.PLANE,
        start_date: "2025-12-01",
        end_date: "2025-12-10",
      };
      const user: UserResponseDto = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
        role: "USER",
      };
      const mockCreatedTrip = {
        id: 1,
        ...createTripDto,
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
      };
      mockTripsService.create.mockResolvedValue(mockCreatedTrip);

      const result = await controller.create(createTripDto, user);

      expect(result).toEqual(mockCreatedTrip);
      expect(mockTripsService.create).toHaveBeenCalledWith(
        createTripDto,
        user.id,
      );
    });
  });

  describe("update", () => {
    it("should update a trip when user is coordinator", async () => {
      const updateData = { name: "Updated Trip" };
      const user: UserResponseDto = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
        role: "USER",
      };
      const mockUpdatedTrip = {
        id: 1,
        name: "Updated Trip",
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
      };
      mockTripsService.isCoordinator.mockResolvedValue(true);
      mockTripsService.update.mockResolvedValue(mockUpdatedTrip);

      const result = await controller.update(1, updateData, user);

      expect(result).toEqual(mockUpdatedTrip);
      expect(mockTripsService.isCoordinator).toHaveBeenCalledWith(1, user.id);
      expect(mockTripsService.update).toHaveBeenCalledWith(1, updateData);
    });

    it("should update a trip when user is admin", async () => {
      const updateData = { name: "Updated Trip" };
      const user: UserResponseDto = {
        id: 2,
        name: "Admin User",
        email: "admin@test.com",
        role: "ADMIN",
      };
      const mockUpdatedTrip = {
        id: 1,
        name: "Updated Trip",
        coordinator: { id: 1, name: "User 1", email: "user1@test.com" },
      };
      mockTripsService.isCoordinator.mockResolvedValue(false);
      mockTripsService.update.mockResolvedValue(mockUpdatedTrip);

      const result = await controller.update(1, updateData, user);

      expect(result).toEqual(mockUpdatedTrip);
      expect(mockTripsService.update).toHaveBeenCalledWith(1, updateData);
    });

    it("should throw ForbiddenException when user is neither coordinator nor admin", async () => {
      const updateData = { name: "Updated Trip" };
      const user: UserResponseDto = {
        id: 2,
        name: "Regular User",
        email: "user@test.com",
        role: "USER",
      };
      mockTripsService.isCoordinator.mockResolvedValue(false);

      await expect(controller.update(1, updateData, user)).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockTripsService.isCoordinator).toHaveBeenCalledWith(1, user.id);
    });
  });

  describe("remove", () => {
    it("should delete a trip when user is coordinator", async () => {
      const user: UserResponseDto = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
        role: "USER",
      };
      const mockDeletedTrip = { id: 1 };
      mockTripsService.isCoordinator.mockResolvedValue(true);
      mockTripsService.remove.mockResolvedValue(mockDeletedTrip);

      const result = await controller.remove(1, user);

      expect(result).toEqual(mockDeletedTrip);
      expect(mockTripsService.isCoordinator).toHaveBeenCalledWith(1, user.id);
      expect(mockTripsService.remove).toHaveBeenCalledWith(1);
    });

    it("should throw ForbiddenException when user is neither coordinator nor admin", async () => {
      const user: UserResponseDto = {
        id: 2,
        name: "Regular User",
        email: "user@test.com",
        role: "USER",
      };
      mockTripsService.isCoordinator.mockResolvedValue(false);

      await expect(controller.remove(1, user)).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockTripsService.isCoordinator).toHaveBeenCalledWith(1, user.id);
    });
  });
});
