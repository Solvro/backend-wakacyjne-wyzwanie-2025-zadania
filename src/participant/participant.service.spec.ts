import type { Participant } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { mockPrisma } from "../../test/utils/mock-prisma";
import { PrismaService } from "../prisma/prisma.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  const prismaMock = mockPrisma();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test("findAll returns participants", async () => {
    const fake = [{ id: 1, name: "P" }];
    prismaMock.participant.findMany.mockResolvedValue(fake);
    const response = await service.findAll();
    expect(response).toBe(fake);
    expect(prismaMock.participant.findMany).toHaveBeenCalledWith({
      include: { trip: true, expenses: true },
    });
  });

  test("findOne throws when not found", async () => {
    prismaMock.participant.findUnique.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(prismaMock.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { trip: true, expenses: true },
    });
  });

  test("create checks trip exists and creates participant", async () => {
    const dto = { name: "A", lastname: "B", tripId: 1, email: "x@x" };
    prismaMock.trip.findUnique.mockResolvedValue({ id: 1 });
    prismaMock.participant.create.mockResolvedValue({ id: 11, ...dto });
    const response = await service.create(dto);
    expect(response).toEqual({ id: 11, ...dto });
    expect(prismaMock.trip.findUnique).toHaveBeenCalledWith({
      where: { id: dto.tripId },
    });
    expect(prismaMock.participant.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: dto.name }) as Partial<Participant>,
    });
  });

  test("create throws if trip not found", async () => {
    prismaMock.trip.findUnique.mockResolvedValue(null);
    await expect(
      service.create({ name: "A", lastname: "B", tripId: 5 }),
    ).rejects.toThrow(NotFoundException);
  });

  test("update throws if participant missing", async () => {
    prismaMock.participant.findUnique.mockResolvedValue(null);
    await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
  });

  test("update updates participant when found", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 7 });
    prismaMock.participant.update.mockResolvedValue({ id: 7, name: "Updated" });

    const response = await service.update(7, { name: "Updated" });
    expect(response).toEqual({ id: 7, name: "Updated" });
    expect(prismaMock.participant.update).toHaveBeenCalledWith({
      where: { id: 7 },
      data: { name: "Updated" },
    });
  });

  test("remove deletes participant when exists", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 2 });
    prismaMock.participant.delete.mockResolvedValue({ id: 2 });
    const response = await service.remove(2);
    expect(response).toEqual({ deleted: true });
    expect(prismaMock.participant.delete).toHaveBeenCalledWith({
      where: { id: 2 },
    });
  });
});
