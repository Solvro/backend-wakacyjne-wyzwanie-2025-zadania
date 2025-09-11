import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  const mockPrismaService = {
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    expenseParticipant: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a participant successfully", async () => {
      const createParticipantDto: CreateParticipantDto = {
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };
      const expectedParticipant = {
        id: 1,
        trip_id: createParticipantDto.trip_id,
        name: createParticipantDto.name,
        surname: createParticipantDto.surname,
        email: createParticipantDto.email,
      };

      mockPrismaService.participant.create.mockResolvedValue(
        expectedParticipant,
      );

      const result = await service.create(createParticipantDto);

      expect(result).toEqual(expectedParticipant);
      expect(mockPrismaService.participant.create).toHaveBeenCalledWith({
        data: {
          trip_id: createParticipantDto.trip_id,
          name: createParticipantDto.name,
          surname: createParticipantDto.surname,
          email: createParticipantDto.email,
        },
      });
      expect(mockPrismaService.participant.create).toHaveBeenCalledTimes(1);
    });

    it("should create a participant with minimal data", async () => {
      const createParticipantDto: CreateParticipantDto = {
        name: "Jane",
        email: "jane@example.com",
      };
      const expectedParticipant = {
        id: 1,
        name: createParticipantDto.name,
        email: createParticipantDto.email,
        trip_id: createParticipantDto.trip_id,
        surname: createParticipantDto.surname,
      };

      mockPrismaService.participant.create.mockResolvedValue(
        expectedParticipant,
      );

      const result = await service.create(createParticipantDto);

      expect(result).toEqual(expectedParticipant);
      expect(mockPrismaService.participant.create).toHaveBeenCalledWith({
        data: {
          trip_id: createParticipantDto.trip_id,
          name: createParticipantDto.name,
          surname: createParticipantDto.surname,
          email: createParticipantDto.email,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const expectedParticipants = [
        {
          id: 1,
          trip_id: 1,
          name: "John",
          surname: "Doe",
          email: "john.doe@example.com",
        },
        {
          id: 2,
          trip_id: 1,
          name: "Jane",
          surname: "Smith",
          email: "jane.smith@example.com",
        },
      ];

      mockPrismaService.participant.findMany.mockResolvedValue(
        expectedParticipants,
      );

      const result = await service.findAll();

      expect(result).toEqual(expectedParticipants);
      expect(mockPrismaService.participant.findMany).toHaveBeenCalledWith();
      expect(mockPrismaService.participant.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no participants exist", async () => {
      mockPrismaService.participant.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrismaService.participant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a participant by id", async () => {
      const participantId = 1;
      const expectedParticipant = {
        id: participantId,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };

      mockPrismaService.participant.findUnique.mockResolvedValue(
        expectedParticipant,
      );

      const result = await service.findOne(participantId);

      expect(result).toEqual(expectedParticipant);
      expect(mockPrismaService.participant.findUnique).toHaveBeenCalledWith({
        where: { id: participantId },
      });
      expect(mockPrismaService.participant.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should return null when participant does not exist", async () => {
      const participantId = 999;
      mockPrismaService.participant.findUnique.mockResolvedValue(null);

      const result = await service.findOne(participantId);

      expect(result).toBeNull();
      expect(mockPrismaService.participant.findUnique).toHaveBeenCalledWith({
        where: { id: participantId },
      });
    });
  });

  describe("update", () => {
    it("should update a participant successfully", async () => {
      const participantId = 1;
      const updateParticipantDto: UpdateParticipantDto = {
        name: "John Updated",
        surname: "Doe Updated",
      };
      const existingParticipant = {
        id: participantId,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };
      const updatedParticipant = Object.assign(
        {},
        existingParticipant,
        updateParticipantDto,
      );

      mockPrismaService.participant.update.mockResolvedValue(
        updatedParticipant,
      );

      const result = await service.update(participantId, updateParticipantDto);

      expect(result).toEqual(updatedParticipant);
      expect(mockPrismaService.participant.update).toHaveBeenCalledWith({
        where: { id: participantId },
        data: updateParticipantDto,
      });
      expect(mockPrismaService.participant.update).toHaveBeenCalledTimes(1);
    });

    it("should update participant with partial data", async () => {
      const participantId = 1;
      const updateParticipantDto: UpdateParticipantDto = {
        email: "new.email@example.com",
      };
      const existingParticipant = {
        id: participantId,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };
      const updatedParticipant = Object.assign(
        {},
        existingParticipant,
        updateParticipantDto,
      );

      mockPrismaService.participant.update.mockResolvedValue(
        updatedParticipant,
      );

      const result = await service.update(participantId, updateParticipantDto);

      expect(result).toEqual(updatedParticipant);
      expect(mockPrismaService.participant.update).toHaveBeenCalledWith({
        where: { id: participantId },
        data: updateParticipantDto,
      });
    });
  });

  describe("remove", () => {
    it("should delete a participant successfully", async () => {
      const participantId = 1;
      const existingParticipant = {
        id: participantId,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };
      const deletedParticipant = { ...existingParticipant };

      mockPrismaService.expenseParticipant.deleteMany.mockResolvedValue({
        count: 2,
      });
      mockPrismaService.participant.delete.mockResolvedValue(
        deletedParticipant,
      );

      const result = await service.remove(participantId);

      expect(result).toEqual(deletedParticipant);
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledWith({
        where: { participant_id: participantId },
      });
      expect(mockPrismaService.participant.delete).toHaveBeenCalledWith({
        where: { id: participantId },
      });
      expect(
        mockPrismaService.expenseParticipant.deleteMany,
      ).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.participant.delete).toHaveBeenCalledTimes(1);
    });

    it("should throw error when deleting non-existent participant", async () => {
      const participantId = 999;
      const error = new Error("Record to delete does not exist.");

      mockPrismaService.expenseParticipant.deleteMany.mockResolvedValue({
        count: 0,
      });
      mockPrismaService.participant.delete.mockRejectedValue(error);

      await expect(service.remove(participantId)).rejects.toThrow(error);
      expect(mockPrismaService.participant.delete).toHaveBeenCalledWith({
        where: { id: participantId },
      });
      expect(mockPrismaService.participant.delete).toHaveBeenCalledTimes(1);
    });
  });
});
