import { Role } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let participantCounter = 1;

  let participants: {
    id: number;
    email: string;
    name: string;
    role: Role;
  }[] = [];

  const initialParticipants = [
    {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      role: Role.PARTICIPANT,
    },
    {
      id: 2,
      email: "b@example.com",
      name: "Bob",
      role: Role.PARTICIPANT,
    },
  ];

  interface Participant {
    data: {
      email: string;
      name: string;
      role: Role;
    };
  }

  const mockDatabaseService = {
    participant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(({ data }: Participant) => {
        const newParticipant = { id: participantCounter++, ...data };
        participants.push(newParticipant);
        return newParticipant;
      }),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    participants = [...initialParticipants];
    participantCounter = initialParticipants.length + 1;

    mockDatabaseService.user.findUnique.mockResolvedValue({
      email: "c@example.com",
      name: "Charlie",
    });

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
      email: "c@example.com",
      name: "Charlie",
      role: Role.PARTICIPANT,
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: {
        email: dto.email,
        name: dto.name,
        role: dto.role,
      },
    });

    expect(result).toEqual({
      id: 3,
      email: dto.email,
      name: dto.name,
      role: dto.role,
    });
  });

  it("should return list of all participants", async () => {
    const participantsMock = [...participants];
    mockDatabaseService.participant.findMany.mockResolvedValue(
      participantsMock,
    );
    const result = await service.getAll();

    expect(result).toEqual(participantsMock);
    expect(mockDatabaseService.participant.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return one participant", async () => {
    const participantMock = {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      role: Role.PARTICIPANT,
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(
      participantMock,
    );
    const result = await service.getOne(1);

    expect(result).toEqual(participantMock);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledTimes(1);
  });

  it("should update a participant", async () => {
    const dto = {
      email: "c@example.com",
      name: "Charlie",
      role: Role.PARTICIPANT,
    };
    const participantMock = await service.create(dto);

    const participantUpdated = {
      id: participantMock.id,
      email: "c@example.com",
      name: "Charles",
      role: Role.GUIDE,
    };

    const dtoUpdate = {
      name: "Charles",
      role: Role.GUIDE,
    };

    mockDatabaseService.participant.update.mockResolvedValue(
      participantUpdated,
    );

    const result = await service.update(participantMock.id, dtoUpdate);

    expect(mockDatabaseService.participant.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(participantUpdated);
    expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
      where: { id: participantMock.id },
      data: dtoUpdate,
    });
  });

  it("should delete a participant", async () => {
    mockDatabaseService.participant.delete.mockResolvedValue();

    await expect(service.delete(1)).resolves.toBeUndefined();

    expect(mockDatabaseService.participant.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should throw NotFoundException when participant not found", async () => {
    mockDatabaseService.participant.findUnique.mockResolvedValue(null);

    await expect(service.getOne(10_000)).rejects.toThrow(NotFoundException);
  });
});
