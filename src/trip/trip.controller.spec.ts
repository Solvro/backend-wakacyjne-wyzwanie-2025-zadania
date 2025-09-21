import { AuthRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "src/common/interfaces/jwt-payload.interface";

import type { CanActivate } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
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

  class MockAuthGuard implements CanActivate {
    canActivate() {
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto: CreateTripDto = {
      name: "Test Trip",
      destination: "Rome",
      budget: 1000,
      startDate: "2025-01-01",
      endDate: "2025-01-10",
    };
    const request = {
      user: {
        sub: "john@example.com",
        role: AuthRole.ADMIN,
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60,
      },
    } as unknown as RequestWithUser;

    const created = { id: 1, dto, coordinatorEmail: request.user?.sub ?? "" };
    mockTripService.create.mockResolvedValue(created);

    const result = await controller.create(dto, request);

    expect(result).toEqual(created);
    expect(mockTripService.create).toHaveBeenCalledWith(dto, request.user);
  });

  it("should return all trips", async () => {
    const trips = [{ id: 1, name: "Test Trip" }];
    mockTripService.findAll.mockResolvedValue(trips);

    const result = await controller.findAll();

    expect(result).toEqual(trips);
    expect(mockTripService.findAll).toHaveBeenCalled();
  });

  it("should return one trip", async () => {
    const trip = { id: 1, name: "Test Trip" };
    mockTripService.findOne.mockResolvedValue(trip);

    const result = await controller.findOne("1");

    expect(result).toEqual(trip);
    expect(mockTripService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a trip", async () => {
    const dto: UpdateTripDto = { name: "Updated Trip" };

    const request = {
      user: {
        sub: "john@example.com",
        role: AuthRole.ADMIN,
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60,
      },
    } as unknown as RequestWithUser;

    const updated = { id: 1, name: "Updated Trip" };
    mockTripService.update.mockResolvedValue(updated);

    const result = await controller.update("1", dto, request);

    expect(result).toEqual(updated);
    expect(mockTripService.update).toHaveBeenCalledWith(
      1,
      dto,
      expect.objectContaining({
        sub: "john@example.com",
        role: AuthRole.ADMIN,
      }),
    );
  });

  it("should delete a trip", async () => {
    const deleted = { id: 1 };
    const request = {
      user: {
        sub: "john@example.com",
        role: AuthRole.ADMIN,
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60,
      },
    } as unknown as RequestWithUser;

    mockTripService.remove.mockResolvedValue(deleted);

    const result = await controller.remove("1", request);

    expect(result).toEqual(deleted);
    expect(mockTripService.remove).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        sub: "john@example.com",
        role: AuthRole.ADMIN,
      }),
    );
  });
});
