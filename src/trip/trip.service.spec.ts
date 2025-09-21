import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { mockPrisma } from "../../test/utils/mock-prisma";
import { PrismaService } from "../prisma/prisma.service";
import { TripService } from "./trip.service";

describe("TripService", () => {
  let service: TripService;
  const prismaMock = mockPrisma();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getAllTrips should return trips with participants and expenses", async () => {
    const fake = [{ id: 1, name: "T1" }];
    prismaMock.trip.findMany.mockResolvedValue(fake);
    await expect(service.getAllTrips()).resolves.toEqual(fake);
    expect(prismaMock.trip.findMany).toHaveBeenCalledWith({
      include: { participants: { include: { expenses: true } } },
    });
  });

  it("createTrip should call prisma.create", async () => {
    const dto = { name: "X", startDate: new Date("2026-07-01") };
    prismaMock.trip.create.mockResolvedValue({ id: 1, ...dto });
    await expect(service.createTrip(dto)).resolves.toMatchObject({ id: 1 });
    expect(prismaMock.trip.create).toHaveBeenCalledWith({ data: dto });
  });

  it("updateTrip should throw NotFoundException when not found", async () => {
    prismaMock.trip.findUnique.mockResolvedValue(null);
    await expect(service.updateTrip(1, { name: "x" })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it("updateTrip should update when found", async () => {
    prismaMock.trip.findUnique.mockResolvedValue({ id: 1 });
    prismaMock.trip.update.mockResolvedValue({ id: 1, name: "updated" });
    await expect(
      service.updateTrip(1, { name: "updated" }),
    ).resolves.toMatchObject({ name: "updated" });
    expect(prismaMock.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "updated" },
    });
  });
});
