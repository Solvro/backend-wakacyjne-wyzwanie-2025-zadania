import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../../../prisma/prisma.service";
import type { CreateParticipantDto } from "../dto/create-participant.dto";
import type { UpdateParticipantDto } from "../dto/update-participant.dto";
import { ParticipantsService } from "../participants.service";

const prismaMock = {
  participant: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  trip: {
    findUnique: jest.fn(),
  },
};

describe("ParticipantsService (unit)", () => {
  let service: ParticipantsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ParticipantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(ParticipantsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.trip.findUnique.mockResolvedValue({ id: 10 });
  });

  afterEach(() => jest.clearAllMocks());

  it("create() tworzy uczestnika", async () => {
    prismaMock.participant.create.mockResolvedValue({ id: 1, name: "Jan" });
    const createDto: CreateParticipantDto = {
      tripId: 10,
      name: "Jan",
      role: "MEMBER",
      share: 100,
    };
    await expect(service.create(createDto)).resolves.toEqual({
      id: 1,
      name: "Jan",
    });
    expect(prismaMock.participant.create).toHaveBeenCalledWith({
      data: {
        name: "Jan",
        role: "MEMBER",
        share: 100,
        trip: { connect: { id: 10 } },
      },
    });
  });

  it("findAll() zwraca listę", async () => {
    prismaMock.participant.findMany.mockResolvedValue([{ id: 1 }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
  });

  it("findOne() zwraca pojedynczy element", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 7 });
    await expect(service.findOne(7)).resolves.toEqual({ id: 7 });
  });

  it("findOne() rzuca 404 w razie braku usera", async () => {
    prismaMock.participant.findUnique.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it("update() aktualizuje użytkownika", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 3 });
    prismaMock.participant.update.mockResolvedValue({ id: 3, name: "Nowe" });
    const updateDto: UpdateParticipantDto = { name: "Nowe" };
    await expect(service.update(3, updateDto)).resolves.toEqual({
      id: 3,
      name: "Nowe",
    });
  });

  it("remove() usuwa użytkownika", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 5 });
    prismaMock.participant.delete.mockResolvedValue({ id: 5 });
    await expect(service.remove(5)).resolves.toEqual({ id: 5 });
  });
  it("create() zwraca 404 gdy wycieczka nie istnieje", async () => {
    const createDto: CreateParticipantDto = {
      tripId: 232_913,
      name: "Jan",
      role: "MEMBER",
      share: 215,
    };

    const fakePrismaErrored = Object.assign(new Error("Record not found"), {
      code: "P2025" as const,
    });
    prismaMock.participant.create.mockRejectedValue(fakePrismaErrored);

    await expect(service.create(createDto)).rejects.toBeInstanceOf(Error);

    expect(prismaMock.participant.create).toHaveBeenCalledWith({
      data: {
        name: "Jan",
        role: "MEMBER",
        share: 215,
        trip: { connect: { id: 232_913 } },
      },
    });
  });
});
