import { AccountType, Role } from "@prisma/client";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validParticipant } from "../../test/test-utils";
import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  const mockDatabaseService = {
    participant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new participant", async () => {
    const dto = await validParticipant();
    const createdParticipant = {
      id: 1,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      role: dto.role,
      account_type: dto.account_type,
      // ! not returning password !
    };

    mockDatabaseService.participant.create.mockResolvedValue(
      createdParticipant,
    );

    const result = await service.create(dto);

    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        password: expect.any(String) as unknown,
      },
      omit: {
        password: true,
      },
    });
    expect(result).toEqual(createdParticipant);
  });
  it("should return all participants", async () => {
    const mockParticipants = [
      {
        id: 1,
        ...(await validParticipant()),
      },
      {
        id: 2,
        ...(await validParticipant()),
      },
    ];

    mockDatabaseService.participant.findMany.mockResolvedValue(
      mockParticipants,
    );

    const result = await service.findAll();
    expect(result.length).toEqual(mockParticipants.length);
    expect(result).toEqual(mockParticipants);
  });

  it("should return a single participant by id", async () => {
    const mockParticipant = {
      id: 1,
      name: "Jan",
      surname: "Kowalski",
      email: "JanKowalski@example.com",
      role: Role.USER,
      account_type: AccountType.BASIC,
      // ! not returning password !
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(
      mockParticipant,
    );

    const result = await service.findOne(1);

    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      omit: { password: true },
    });
    expect(result).toEqual(mockParticipant);
  });

  it("should return a single participant by email", async () => {
    const mockParticipant = {
      id: 1,
      ...(await validParticipant()),
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(
      mockParticipant,
    );

    const result = await service.findByEmail("JanKowalski@example.com");

    expect(result).toEqual(mockParticipant);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { email: "JanKowalski@example.com" },
    });
  });

  it("should return participants metadata", async () => {
    const metadata = {
      id: 1,
      email: "abc@example.com",
      role: "USER",
      account_type: "BASIC",
    };

    mockDatabaseService.participant.findUnique.mockResolvedValue(metadata);

    const result = await service.findMetadata(1);

    expect(result).toEqual(metadata);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: { account_type: true, email: true, id: true, role: true },
    });
  });

  it("Should update a participant", async () => {
    const updatedParticipant = {
      id: 1,
      ...(await validParticipant()),
    };

    mockDatabaseService.participant.update.mockResolvedValue(
      updatedParticipant,
    );
    const result = await service.updateAny({ id: 1, name: "updatedName" });

    expect(result).toEqual(updatedParticipant);
    expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        account_type: undefined,
        name: "updatedName",
        surname: undefined,
      },
      omit: { password: true },
    });
  });

  it("Should delete a participant", async () => {
    const deletedParticipant = {
      id: 1,
      ...(await validParticipant()),
    };

    mockDatabaseService.participant.delete.mockResolvedValue(
      deletedParticipant,
    );
    const result = await service.deleteAny(1);

    expect(result).toEqual(deletedParticipant);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
