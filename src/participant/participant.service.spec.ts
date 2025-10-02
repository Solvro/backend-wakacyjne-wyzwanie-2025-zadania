import { Sex } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let database: DatabaseService;

  const mockDatabaseService = {
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

    service = module.get<ParticipantService>(ParticipantService);
    database = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  // Create
  it("should create a participant", async () => {
    const dto = {
      name: "Szymon",
      surname: "Stępień",
      age: 17,
      sex: Sex.MALE,
      email: "example@gmail.com",
    };

    mockDatabaseService.participant.create.mockResolvedValue({ undefined });

    await service.create(dto);

    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        surname: dto.surname,
        age: dto.age,
        sex: Sex.MALE,
        email: dto.email,
      },
    });
  });

  // Find All
  it("should find all participants", async () => {
    const participants = [
      { id: 1, name: "Szymon", surname: "Stępień", age: 17 },
      { id: 2, name: "Jakub", surname: "Czajkowski", age: 25 },
    ];
    mockDatabaseService.participant.findMany.mockResolvedValue(participants);

    const result = await service.findAll();

    expect(mockDatabaseService.participant.findMany).toHaveBeenCalled();
    expect(result).toEqual(participants);
  });

  // Find One
  it("should find one participant", async () => {
    const participant = { id: 1, name: "Szymon", surname: "Stępień", age: 17 };
    mockDatabaseService.participant.findUnique.mockResolvedValue(participant);

    const result = await service.findOne(1);

    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(participant);
  });

  // Update
  it("should update a participant", async () => {
    const dto = {
      name: "Szymon",
      surname: "Stępień",
      age: 18,
      sex: Sex.MALE,
      email: "another-example@gmail.com",
    };

    mockDatabaseService.participant.update.mockResolvedValue({ undefined });

    await service.update(1, dto);

    expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: dto.name,
        surname: dto.surname,
        age: dto.age,
        sex: Sex.MALE,
        email: dto.email,
      },
    });
  });

  // Remove
  it("should remove a participant", async () => {
    mockDatabaseService.participant.delete.mockResolvedValue({ undefined });

    await service.remove(1);

    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
