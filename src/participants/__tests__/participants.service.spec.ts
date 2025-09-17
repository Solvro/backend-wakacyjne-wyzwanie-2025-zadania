import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../../../prisma/prisma.service";
import { ParticipantsService } from "../participants.service";

const prismaMock = {
  participant: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// wiem że w angielskim byłoby it('should do sth'), ale że reszta apki jest po polsku to testy dla spójności też zrobię po polsku

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

  afterEach(() => jest.clearAllMocks());

  it("create() tworzy uczestnika", async () => {
    prismaMock.participant.create.mockResolvedValue({ id: 1, name: "Jan" });
    await expect(
      service.create({
        tripId: 10,
        name: "Jan",
        role: "MEMBER",
        share: "100.00",
      } as any),
    ).resolves.toEqual({ id: 1, name: "Jan" });
    expect(prismaMock.participant.create).toHaveBeenCalledWith({
      data: {
        name: "Jan",
        role: "MEMBER",
        share: "100.00",
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
    await expect(service.update(3, { name: "Nowe" } as any)).resolves.toEqual({
      id: 3,
      name: "Nowe",
    });
  });

  it("remove() usuwa użytkownika", async () => {
    prismaMock.participant.findUnique.mockResolvedValue({ id: 5 });
    prismaMock.participant.delete.mockResolvedValue({ id: 5 });
    await expect(service.remove(5)).resolves.toEqual({ id: 5 });
  });
});
