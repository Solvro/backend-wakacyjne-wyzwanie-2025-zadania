import { Role } from "@prisma/client";
import type { UserMetadata } from "src/users/dto/user-metadata.dto";

import { ForbiddenException, NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  const mockDatabaseService = {
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    tripParticipants: {
      deleteMany: jest.fn(),
    },
  };

  const adminUser: UserMetadata = {
    userId: 1,
    email: "admin@example.com",
    role: Role.ADMIN,
  };
  const regularUser: UserMetadata = {
    userId: 3,
    email: "user@example.com",
    role: Role.USER,
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

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create a participant", async () => {
      const dto = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123456",
      };
      const result = {
        participant_id: 1,
        ...dto,
        created_by_user_id: adminUser.userId,
      };

      mockDatabaseService.participant.create.mockResolvedValue(result);

      const response = await service.create(dto, adminUser);
      expect(response).toEqual(result);
      expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
        data: {
          first_name: dto.firstName,
          last_name: dto.lastName,
          email: dto.email,
          phone: dto.phone,
          created_by_user_id: adminUser.userId,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return all participants for ADMIN", async () => {
      const participants = [{ participant_id: 1 }];
      mockDatabaseService.participant.findMany.mockResolvedValue(participants);

      const response = await service.findAll(adminUser);
      expect(response).toEqual(participants);
      expect(mockDatabaseService.participant.findMany).toHaveBeenCalledWith({
        orderBy: { created_at: "desc" },
      });
    });

    it("should return own participants for regular user", async () => {
      const participants = [
        { participant_id: 2, created_by_user_id: regularUser.userId },
      ];
      mockDatabaseService.participant.findMany.mockResolvedValue(participants);

      const response = await service.findAll(regularUser);
      expect(response).toEqual(participants);
      expect(mockDatabaseService.participant.findMany).toHaveBeenCalledWith({
        where: { created_by_user_id: regularUser.userId },
        orderBy: { created_at: "desc" },
      });
    });
  });

  describe("findOne", () => {
    it("should return participant if user is allowed", async () => {
      const participant = {
        participant_id: 1,
        created_by_user_id: regularUser.userId,
      };
      mockDatabaseService.participant.findUnique.mockResolvedValue(participant);

      const response = await service.findOne(1, regularUser);
      expect(response).toEqual(participant);
    });

    it("should throw NotFoundException if participant does not exist", async () => {
      mockDatabaseService.participant.findUnique.mockResolvedValue(null);
      await expect(service.findOne(99, regularUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ForbiddenException if user is not allowed", async () => {
      const participant = { participant_id: 1, created_by_user_id: 99 };
      mockDatabaseService.participant.findUnique.mockResolvedValue(participant);

      await expect(service.findOne(1, regularUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe("update", () => {
    const updateDto = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "987654",
    };

    it("should update participant if user is allowed", async () => {
      const existing = {
        participant_id: 1,
        created_by_user_id: regularUser.userId,
      };
      const updated = {
        participant_id: 1,
        ...updateDto,
        created_by_user_id: regularUser.userId,
      };

      mockDatabaseService.participant.findUnique.mockResolvedValue(existing);
      mockDatabaseService.participant.update.mockResolvedValue(updated);

      const response = await service.update(1, updateDto, regularUser);
      expect(response).toEqual(updated);
      expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
        where: { participant_id: 1 },
        data: {
          first_name: updateDto.firstName,
          last_name: updateDto.lastName,
          email: updateDto.email,
          phone: updateDto.phone,
        },
      });
    });

    it("should throw NotFoundException if participant does not exist", async () => {
      mockDatabaseService.participant.findUnique.mockResolvedValue(null);
      await expect(service.update(99, updateDto, adminUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ForbiddenException if user is not allowed", async () => {
      const existing = { participant_id: 1, created_by_user_id: 99 };
      mockDatabaseService.participant.findUnique.mockResolvedValue(existing);

      await expect(service.update(1, updateDto, regularUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe("remove", () => {
    it("should delete participant if user is allowed", async () => {
      const participant = {
        participant_id: 1,
        created_by_user_id: regularUser.userId,
      };
      mockDatabaseService.participant.findUnique.mockResolvedValue(participant);
      mockDatabaseService.tripParticipants.deleteMany.mockResolvedValue({});
      mockDatabaseService.participant.delete.mockResolvedValue(participant);

      const response = await service.remove(1, regularUser);
      expect(response).toEqual({
        message: "Participant with ID 1 removed successfully",
      });
      expect(
        mockDatabaseService.tripParticipants.deleteMany,
      ).toHaveBeenCalledWith({ where: { participant_id: 1 } });
      expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
        where: { participant_id: 1 },
      });
    });

    it("should throw NotFoundException if participant does not exist", async () => {
      mockDatabaseService.participant.findUnique.mockResolvedValue(null);
      await expect(service.remove(99, adminUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ForbiddenException if user is not allowed", async () => {
      const participant = { participant_id: 1, created_by_user_id: 99 };
      mockDatabaseService.participant.findUnique.mockResolvedValue(participant);

      await expect(service.remove(1, regularUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
