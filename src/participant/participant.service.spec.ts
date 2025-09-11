import { Role } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import type { PaginationDto } from "src/pagination/pagination.dto";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let database: DatabaseService;

  const mockDatabaseService = {
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findByEmail: jest.fn(),
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
  });

  it("should find one participant by id", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(dto);

    const result = await service.findOne(1);

    expect(result).toHaveProperty("participant_id", 1);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { participant_id: 1 },
    });
  });

  it("should find all participants", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };
    const dto1 = {
      participant_id: 2,
      name: "Janusz2",
      email: "janusz2@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.findMany.mockResolvedValue([dto, dto1]);

    const paginationDto: PaginationDto = { limit: 10, skip: 0 };
    const result = await service.findAll(paginationDto);

    expect(result).toHaveLength(2);
    expect(result).toEqual([dto, dto1]);
    expect(mockDatabaseService.participant.findMany).toHaveBeenCalled();
  });

  it("should find participant by email", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.findByEmail.mockResolvedValue(dto);

    const result = await service.findOneByEmail("janusz@example.com");

    expect(result?.email).toBe("janusz@example.com");
  });

  it("should create a participant", async () => {
    const dto = {
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.create.mockResolvedValue({
      participant_id: 1,
      ...dto,
    });

    const result = await service.create(dto);

    expect(result).toHaveProperty("participant_id");
    expect(result.name).toBe("Janusz");
    expect(await service.create(dto)).toEqual({
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    });
  });

  it("should delete record", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.delete.mockResolvedValue(dto);

    const result = await service.remove(1);

    expect(result).toHaveProperty("participant_id");
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { participant_id: 1 },
    });
  });

  it("should update participant", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockDatabaseService.participant.create.mockResolvedValue(dto);

    const resultCreate = await service.create(dto);

    expect(resultCreate).toHaveProperty("participant_id", 1);

    const dtoUpdate = {
      name: "janek",
    };

    const updatedParticipant = { ...dto, ...dtoUpdate };

    mockDatabaseService.participant.update.mockResolvedValue(
      updatedParticipant,
    );

    const result = await service.update(dto.participant_id, dtoUpdate);

    expect(result.name).toBe("janek");
  });
});
