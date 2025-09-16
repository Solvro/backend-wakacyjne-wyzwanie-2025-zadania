/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// <-- użyj swojego interfejsu
import { AuthRole, Prisma } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { JwtPayload } from "../common/interfaces/jwt-payload.interface";
import { DatabaseService } from "../database/database.service";
import type { CreateTripDto } from "./dto/create-trip.dto";
import type { UpdateTripDto } from "./dto/update-trip.dto";
import { TripService } from "./trip.service";

const mockDatabaseService = {
  trip: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("TripService", () => {
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<TripService>(TripService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto: CreateTripDto = {
      name: "Test Trip",
      destination: "Rome",
      budget: 1000,
      startDate: "2025-01-01",
      endDate: "2025-01-10",
    };

    const user: JwtPayload = {
      sub: "john@example.com",
      role: AuthRole.USER,
      iat: 0,
      exp: 0,
    };
    const created = { id: 1, dto, coordinatorEmail: user.sub };

    mockDatabaseService.trip.create.mockResolvedValue(created);

    const result = await service.create(dto, user);

    expect(result).toEqual(created);
    expect(mockDatabaseService.trip.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        destination: dto.destination,
        budget:
          dto.budget === undefined ? undefined : new Prisma.Decimal(dto.budget),
        startDate: new Date(dto.startDate),
        endDate: dto.endDate === undefined ? undefined : new Date(dto.endDate),
        coordinatorEmail: user.sub,
        participants: {
          create: [
            {
              email: user.sub,
              firstName: user.sub,
              lastName: "",
              role: "GUIDE",
            },
          ],
        },
      },
      include: { participants: true, expenses: true, coordinator: true },
    });
  });

  it("should return all trips", async () => {
    const trips = [{ id: 1, name: "Test Trip" }];
    mockDatabaseService.trip.findMany.mockResolvedValue(trips);

    const result = await service.findAll();

    expect(result).toEqual(trips);
    expect(mockDatabaseService.trip.findMany).toHaveBeenCalledWith({
      include: {
        participants: true,
        expenses: true,
        coordinator: {
          select: { email: true, name: true, role: true },
        },
      },
      orderBy: { id: "asc" },
    });
  });

  it("should return one trip", async () => {
    const trip = { id: 1, name: "Test Trip" };
    mockDatabaseService.trip.findUnique.mockResolvedValue(trip);

    const result = await service.findOne(1);

    expect(result).toEqual(trip);
    expect(mockDatabaseService.trip.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        participants: true,
        expenses: true,
        coordinator: {
          select: { email: true, name: true, role: true },
        },
      },
    });
  });

  it("should update a trip", async () => {
    const dto: UpdateTripDto = { name: "Updated Trip" };
    const updated = { id: 1, name: "Updated Trip" };
    const user = { sub: "john@example.com", role: AuthRole.USER };

    // 🟢 najpierw mockujemy findUnique, żeby użytkownik był koordynatorem
    mockDatabaseService.trip.findUnique.mockResolvedValue({
      id: 1,
      name: "Old Trip",
      coordinatorEmail: user.sub,
    });

    mockDatabaseService.trip.update.mockResolvedValue(updated);

    const result = await service.update(1, dto, user);

    expect(result).toEqual(updated);
    expect(mockDatabaseService.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: dto.name,
        destination: dto.destination ?? undefined,
        budget:
          dto.budget === undefined ? undefined : new Prisma.Decimal(dto.budget),
        startDate:
          dto.startDate === undefined ? undefined : new Date(dto.startDate),
        endDate: dto.endDate === undefined ? undefined : new Date(dto.endDate),
        participants: { set: [] },
      },
      include: { participants: true, expenses: true, coordinator: true },
    });
  });

  it("should delete a trip", async () => {
    const deleted = { id: 1 };
    const user: JwtPayload = {
      sub: "john@example.com",
      role: AuthRole.ADMIN,
      iat: 0,
      exp: 0,
    };

    mockDatabaseService.trip.delete.mockResolvedValue(deleted);

    const result = await service.remove(1, user);

    expect(result).toHaveProperty("success", true);
    expect(mockDatabaseService.trip.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
