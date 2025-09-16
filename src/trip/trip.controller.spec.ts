import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { TripRoleGuard } from "../auth/roles/trip-role.guard";
import { RoleGuard } from "../auth/roles/user-role.guard";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    findAll: jest.fn(() => [
      { trip_id: 1, name: "Test trip", destination: "Kraków" },
    ]),
    findOnePublic: jest.fn((id) => {
      if (id === 1)
        return { trip_id: 1, name: "Test trip", destination: "Kraków" };
      throw new NotFoundException();
    }),
    findOnePrivate: jest.fn((id) => ({
      trip_id: id,
      name: "Secret trip",
      destination: "Wrocław",
      budget: 1000,
    })),
    create: jest.fn((dto) => ({ trip_id: 2, ...dto })),
    update: jest.fn((id, dto) => ({ trip_id: id, ...dto })),
    remove: jest.fn((id) => {
      if (id !== 1) throw new NotFoundException();
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(TripRoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all trips", async () => {
    expect(await controller.findAll()).toEqual([
      { trip_id: 1, name: "Test trip", destination: "Kraków" },
    ]);
    expect(mockTripService.findAll).toHaveBeenCalled();
  });

  it("should return one trip (public)", async () => {
    expect(await controller.findOnePublic({ id: 1 })).toEqual({
      trip_id: 1,
      name: "Test trip",
      destination: "Kraków",
    });
    expect(mockTripService.findOnePublic).toHaveBeenCalledWith(1);
  });

  it("should throw NotFoundException if public trip not found", async () => {
    await expect(controller.findOnePublic({ id: 99 })).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should return one trip (private)", async () => {
    expect(await controller.findOnePrivate({ id: 1 })).toEqual({
      trip_id: 1,
      name: "Secret trip",
      destination: "Wrocław",
      budget: 1000,
    });
    expect(mockTripService.findOnePrivate).toHaveBeenCalledWith(1);
  });

  it("should create a trip", async () => {
    const dto = {
      name: "Nowa wycieczka",
      destination: "Warszawa",
      start_date: new Date(),
    };
    expect(await controller.create(dto as any)).toEqual({ trip_id: 2, ...dto });
    expect(mockTripService.create).toHaveBeenCalledWith(dto);
  });

  it("should update a trip", async () => {
    const dto = { name: "Zmieniona wycieczka", destination: "Gdańsk" };
    expect(await controller.update({ id: 1 }, dto as any)).toEqual({
      trip_id: 1,
      ...dto,
    });
    expect(mockTripService.update).toHaveBeenCalledWith(1, dto);
  });

  it("should remove a trip", async () => {
    expect(await controller.remove({ id: 1 })).toBeUndefined();
    expect(mockTripService.remove).toHaveBeenCalledWith(1);
  });

  it("should throw NotFoundException if trip to remove not found", async () => {
    await expect(controller.remove({ id: 99 })).rejects.toThrow(
      NotFoundException,
    );
  });
});
