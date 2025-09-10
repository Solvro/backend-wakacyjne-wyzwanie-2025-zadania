import { Sex } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  let participantCounter = 1;

  let participantsInMemory: {
    participantId: number;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  const initialParticipants = [
    {
      participantId: 1,
      firstName: "A",
      lastName: "B",
      email: "C",
      address: "W",
      phoneNumber: "2137",
      sex: Sex.OTHER,
    },
    {
      participantId: 2,
      firstName: "D",
      lastName: "E",
      email: "F",
      address: "F",
      phoneNumber: "123123",
      sex: Sex.FEMALE,
    },
  ];

  interface Participant {
    data: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      phoneNumber: string;
      sex: Sex;
    };
  }

  const mockDatabaseService = {
    participant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Participant) => {
        const newParticipant = { participantId: participantCounter++, ...data };
        participantsInMemory.push(newParticipant);
        return newParticipant;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    participantsInMemory = [...initialParticipants];
    participantCounter = initialParticipants.length + 1;

    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new participant", async () => {
    const dto = {
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("participantId");

    expect(result.address).toBe("F");

    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        sex: dto.sex,
      },
    });

    expect(result).toEqual({
      participantId: 3,
      ...dto,
    });
  });

  it("should return list of all participants", async () => {
    const participantsMock = [...participantsInMemory];
    mockDatabaseService.participant.findMany.mockResolvedValue(
      participantsMock,
    );
    const result = await service.findAll();

    expect(result).toEqual(participantsMock);
    expect(mockDatabaseService.participant.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one participant", async () => {
    const participantMock = {
      participantId: 1,
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(
      participantMock,
    );
    const result = await service.findOne(1);

    expect(result).toEqual(participantMock);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a participant", async () => {
    const dto = {
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };
    const participantMock = await service.create(dto); //participantId == 3

    const participantUpdated = {
      participantId: participantMock.participantId,
      firstName: "G",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    const dtoUpdate = {
      firstName: "G",
    };

    mockDatabaseService.participant.update.mockResolvedValue(
      participantUpdated,
    );

    const result = await service.update(
      participantMock.participantId,
      dtoUpdate,
    );

    expect(mockDatabaseService.participant.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(participantUpdated);
    expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
      where: { participantId: participantMock.participantId },
      data: dtoUpdate,
    });
  });

  it("should delete a participant", async () => {
    const participantMock = {
      participantId: 1,
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };
    mockDatabaseService.participant.delete.mockResolvedValue(participantMock);

    const result = await service.remove(1);

    expect(result).toEqual(participantMock);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalled();
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { participantId: 1 },
    });
  });

  it("should throw NotFoundException when participant not found", async () => {
    mockDatabaseService.participant.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
