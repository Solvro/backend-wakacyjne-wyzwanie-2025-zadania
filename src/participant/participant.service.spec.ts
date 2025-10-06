import { NotFoundException } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { Gender } from "@prisma/client";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let participantCounter = 1;

  let participants: {
    id: number;
    email: string;
    name: string;
    gender: Gender;
    surname: string;
    age: number;
    tripId: number;
  }[] = [];

  const initialParticipants = [
    {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      surname: "Smith",
      age: 30,
      tripId: 101,
      gender: Gender.F,
    },
    {
      id: 2,
      email: "b@example.com",
      name: "Bob",
      surname: "Johnson",
      age: 25,
      tripId: 102,
      gender: Gender.M,
    },
  ];

  interface Participant {
    data: {
      email: string;
      name: string;
      surname: string;
      age: number;
      tripId: number;
      gender: Gender;
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
    trip: {
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

    service = module.get<ParticipantService>(ParticipantService);

    mockDatabaseService.trip.findUnique.mockResolvedValue({
      id: 103,
      name: "Test Trip",
      location: "Test Location",
      startDate: new Date(),
      endDate: new Date(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new participant", async () => {
    const dto = {
      userEmail: "c@example.com",
      name: "Charlie",
      surname: "Brown",
      age: 28,
      tripId: 103,
      gender: Gender.M,
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: {
        userEmail: dto.userEmail,
        name: dto.name,
        surname: dto.surname,
        age: dto.age,
        tripId: dto.tripId,
        gender: dto.gender,
      },
    });

    expect(result).toEqual({
      id: 3,
      userEmail: dto.userEmail,
      name: dto.name,
      surname: dto.surname,
      age: dto.age,
      tripId: dto.tripId,
      gender: dto.gender,
    });
  });

  it("should return one participant", async () => {
    const participantMock = {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      surname: "Smith",
      gender: Gender.F,
      age: 30,
      tripId: 101,
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
      email: "c@example.com",
      name: "Charlie",
      surname: "Brown",
      age: 28,
      tripId: 103,
      gender: Gender.M,
    };

    const participantMock = await service.create(dto);

    const participantUpdated = {
      id: participantMock.id,
      email: "c@example.com",
      name: "Charles",
      surname: "Brown",
      age: 28,
      tripId: 103,
      gender: Gender.M,
    };

    const dtoUpdate = {
      name: "Charles",
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
    mockDatabaseService.participant.delete.mockResolvedValue(undefined);

    await expect(service.remove(1)).resolves.toBeUndefined();

    expect(mockDatabaseService.participant.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should throw NotFoundException when participant not found", async () => {
    mockDatabaseService.participant.findUnique.mockResolvedValueOnce(null);

    await expect(service.findOne(500)).rejects.toThrow(NotFoundException);
  });
});
