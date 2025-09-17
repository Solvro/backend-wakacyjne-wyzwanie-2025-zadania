import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { TripRoleGuard } from "../auth/roles/trip-role.guard";
import { RoleGuard } from "../auth/roles/user-role.guard";
import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    findAll: jest.fn(() => [
      { trip_id: 1, name: "Test trip", destination: "Kraków" },
    ]),
    findOnePublic: jest.fn((id: number) => {
      if (id === 1) {
        return { trip_id: 1, name: "Test trip", destination: "Kraków" };
      }
      throw new NotFoundException();
    }),
    findOnePrivate: jest.fn((id: number) => ({
      trip_id: id,
      name: "Secret trip",
      destination: "Wrocław",
      budget: 1000,
    })),
    create: jest.fn((dto: CreateTripDto) => Object.assign({ trip_id: 2 }, dto)),
    update: jest.fn((id: number, dto: UpdateTripDto) =>
      Object.assign({ trip_id: id }, dto),
    ),
    remove: jest.fn((id: number) => {
      if (id !== 1) {
        throw new NotFoundException();
      }
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all trips", async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        { trip_id: 1, name: "Test trip", destination: "Kraków" },
      ]);
      expect(mockTripService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOnePublic", () => {
    it("should return one public trip", async () => {
      const result = await controller.findOnePublic({ id: 1 });
      expect(result).toEqual({
        trip_id: 1,
        name: "Test trip",
        destination: "Kraków",
      });
      expect(mockTripService.findOnePublic).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if not found", async () => {
      await expect(controller.findOnePublic({ id: 99 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("findOnePrivate", () => {
    it("should return one private trip", async () => {
      const result = await controller.findOnePrivate({ id: 1 });
      expect(result).toEqual({
        trip_id: 1,
        name: "Secret trip",
        destination: "Wrocław",
        budget: 1000,
      });
      expect(mockTripService.findOnePrivate).toHaveBeenCalledWith(1);
    });
  });

  describe("create", () => {
    it("should create a trip", async () => {
      const dto: CreateTripDto = {
        name: "Nowa wycieczka",
        destination: "Warszawa",
        start_date: new Date().toISOString(),
      };

      const result = await controller.create(dto);

      expect(result).toEqual(Object.assign({ trip_id: 2 }, dto));
      expect(mockTripService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("update", () => {
    it("should update a trip", async () => {
      const dto: UpdateTripDto = {
        name: "Zmieniona wycieczka",
        destination: "Gdańsk",
      };

      const result = await controller.update({ id: 1 }, dto);

      expect(result).toEqual(Object.assign({ trip_id: 1 }, dto));
      expect(mockTripService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove a trip", async () => {
      await expect(controller.remove({ id: 1 })).resolves.toBeUndefined();
      expect(mockTripService.remove).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if not found", async () => {
      await expect(controller.remove({ id: 99 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
