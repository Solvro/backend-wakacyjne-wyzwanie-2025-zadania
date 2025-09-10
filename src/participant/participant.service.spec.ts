/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { BadRequestException, ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let database: DatabaseService;

  const mockParticipantBase = {
    name: expect.any(String),
    surname: expect.any(String),
    age: expect.any(Number),
  };

  const mockParticipant1 = {
    id: 1,
    name: "Jan",
    surname: "Kowalski",
    email: "jan@test.com",
    age: 30,
  };

  const mockParticipant2 = {
    id: 2,
    name: "Anna",
    surname: "Nowak",
    email: "anna@test.com",
    age: 25,
  };

  const mockUser = {
    id: 1,
    email: "jan@test.com",
    password: "hashed",
    name: "Jan",
    surname: "Kowalski",
    role: "USER" as const,
    is_enabled: true,
  };

  const mockDatabase = {
    participant: {
      findMany: jest
        .fn()
        .mockResolvedValue([mockParticipant1, mockParticipant2]),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
          return mockParticipant1;
        }
        if (where.id === 2) {
          return mockParticipant2;
        }
        if (where.email === "jan@test.com") {
          return mockParticipant1;
        }
        return null;
      }),
      create: jest.fn().mockImplementation(({ data }) => ({
        id: 3,
        ...mockParticipantBase,
        ...data,
      })),
      update: jest.fn().mockImplementation(({ where, data }) => ({
        ...mockParticipant1,
        ...data,
        id: where.id,
      })),
      delete: jest.fn().mockResolvedValue(mockParticipant1),
    },
    user: {
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.email === "jan@test.com") {
          return mockUser;
        }
        if (where.email === "anna@test.com") {
          return mockUser;
        }
        return null;
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabase)
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

  describe("create", () => {
    it("powinien utworzyć uczestnika bez email", async () => {
      const dto: CreateParticipantDto = {
        name: "Jan",
        surname: "Kowalski",
        age: 30,
      };

      const result = await service.create(dto);

      expect(result).toHaveProperty("id");
      expect(result.name).toBe(dto.name);
      expect(mockDatabase.participant.create).toHaveBeenCalledWith({
        data: dto,
      });
    });

    it("powinien utworzyć nowego uczestnika, jeśli istnieje user i participant nie istnieje", async () => {
      const dto: CreateParticipantDto = {
        name: "Jan",
        surname: "Kowalski",
        email: "jan@test.com",
        age: 30,
      };

      mockDatabase.participant.findUnique.mockReturnValueOnce(null);

      const result = await service.create(dto);

      expect(result).toHaveProperty("id");
      expect(result.email).toBe(dto.email);
      expect(mockDatabase.participant.create).toHaveBeenCalledWith({
        data: dto,
      });
    });

    it("powinien wyrzucić BadRequestException, jeżeli nie ma usera", async () => {
      const dto: CreateParticipantDto = {
        name: "Jan",
        surname: "Kowalski",
        email: "nieistnieje@test.com",
        age: 30,
      };

      await expect(service.create(dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(mockDatabase.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });

    it("powinien wyrzucić ConflictException, jeżeli istnieje już participant", async () => {
      const dto: CreateParticipantDto = {
        name: "Jan",
        surname: "Kowalski",
        email: "jan@test.com",
        age: 30,
      };
      const participant = {
        id: 1,
        name: "Jan",
        surname: "Kowalski",
        email: "jan@test.com",
        age: 30,
      };

      mockDatabase.participant.findUnique.mockReturnValueOnce(participant);

      await expect(service.create(dto)).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(mockDatabase.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić listę uczestników", async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("email", "jan@test.com");
      expect(mockDatabase.participant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("powinien zwrócić uczestnika po ID", async () => {
      const result = await service.findOne(1);

      expect(result).toHaveProperty("email", "jan@test.com");
      expect(mockDatabase.participant.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("powinien zwrócić null, jeśli uczestnik nie istnieje", async () => {
      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(mockDatabase.participant.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe("update", () => {
    it("powinien zaktualizować istniejącego uczestnika", async () => {
      const dto = { name: "Maciej" };

      const result = await service.update(1, dto);

      expect(result).toHaveProperty("id", 1);
      expect(result.name).toBe("Maciej");
      expect(mockDatabase.participant.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe("remove", () => {
    it("powinien usunąć uczestnika po ID", async () => {
      const result = await service.remove(1);

      expect(result).toHaveProperty("id", 1);
      expect(mockDatabase.participant.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
