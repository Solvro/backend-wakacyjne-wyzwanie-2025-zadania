import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { createMockPrismaService } from "../test/test-utils";
import type { ParticipantDto } from "./dto/participant.dto";
import { ParticipantsService } from "./participants.service";

describe("ParticipantsService", () => {
  let service: ParticipantsService;

  // Using centralized mock instead of inline declaration
  const mockPrismaService = createMockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addParticipantToTrip", () => {
    it("should add a participant to an existing trip", async () => {
      const tripId = 1;
      const participantDto: ParticipantDto = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+48123456789",
        isOrganizer: false,
      };

      const existingTrip = { id: tripId, name: "Test Trip" };
      const createdParticipant = {
        id: 1,
        name: participantDto.name,
        email: participantDto.email,
        phone: participantDto.phone,
        isOrganizer: false,
        tripId,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.participant.create.mockResolvedValue(
        createdParticipant,
      );

      const result = await service.addParticipantToTrip(tripId, participantDto);

      expect(result).toEqual(createdParticipant);
      expect(mockPrismaService.trip.findUnique).toHaveBeenCalledWith({
        where: { id: tripId },
      });
      expect(mockPrismaService.participant.create).toHaveBeenCalledWith({
        data: {
          name: participantDto.name,
          email: participantDto.email,
          phone: participantDto.phone,
          isOrganizer: false,
          tripId,
        },
      });
    });

    it("should set isOrganizer to true when specified", async () => {
      const tripId = 1;
      const participantDto: ParticipantDto = {
        name: "Jane Smith",
        email: "jane@example.com",
        isOrganizer: true,
      };

      const existingTrip = { id: tripId, name: "Test Trip" };
      const createdParticipant = {
        id: 1,
        name: participantDto.name,
        email: participantDto.email,
        phone: participantDto.phone,
        isOrganizer: true,
        tripId,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(existingTrip);
      mockPrismaService.participant.create.mockResolvedValue(
        createdParticipant,
      );

      const result = await service.addParticipantToTrip(tripId, participantDto);

      expect(result).toEqual(createdParticipant);
      expect(mockPrismaService.participant.create).toHaveBeenCalledWith({
        data: {
          name: participantDto.name,
          email: participantDto.email,
          phone: participantDto.phone,
          isOrganizer: true,
          tripId,
        },
      });
    });

    it("should throw NotFoundException when trip does not exist", async () => {
      const tripId = 999;
      const participantDto: ParticipantDto = {
        name: "John Doe",
        email: "john@example.com",
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(
        service.addParticipantToTrip(tripId, participantDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.addParticipantToTrip(tripId, participantDto),
      ).rejects.toThrow("Trip with ID 999 not found");
    });
  });

  describe("updateParticipant", () => {
    it("should update an existing participant", async () => {
      const participantId = 1;
      const updateParticipantDto: ParticipantDto = {
        name: "Updated Name",
        email: "updated@example.com",
        phone: "+48987654321",
        isOrganizer: true,
      };

      const existingParticipant = {
        id: participantId,
        name: "Old Name",
        email: "old@example.com",
      };
      const updatedParticipant = {
        id: participantId,
        name: updateParticipantDto.name,
        email: updateParticipantDto.email,
        phone: updateParticipantDto.phone,
        isOrganizer: updateParticipantDto.isOrganizer,
      };

      mockPrismaService.participant.findUnique.mockResolvedValue(
        existingParticipant,
      );
      mockPrismaService.participant.update.mockResolvedValue(
        updatedParticipant,
      );

      const result = await service.updateParticipant(
        participantId,
        updateParticipantDto,
      );

      expect(result).toEqual(updatedParticipant);
      expect(mockPrismaService.participant.findUnique).toHaveBeenCalledWith({
        where: { id: participantId },
      });
      expect(mockPrismaService.participant.update).toHaveBeenCalledWith({
        where: { id: participantId },
        data: {
          name: updateParticipantDto.name,
          email: updateParticipantDto.email,
          phone: updateParticipantDto.phone,
          isOrganizer: updateParticipantDto.isOrganizer,
        },
      });
    });

    it("should throw NotFoundException when participant does not exist", async () => {
      const participantId = 999;
      const updateParticipantDto: ParticipantDto = {
        name: "Updated Name",
        email: "updated@example.com",
      };

      mockPrismaService.participant.findUnique.mockResolvedValue(null);

      await expect(
        service.updateParticipant(participantId, updateParticipantDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.updateParticipant(participantId, updateParticipantDto),
      ).rejects.toThrow("Participant with ID 999 not found");
    });
  });

  describe("deleteParticipant", () => {
    it("should delete an existing participant", async () => {
      const participantId = 1;
      const existingParticipant = {
        id: participantId,
        name: "John Doe",
        email: "john@example.com",
      };

      mockPrismaService.participant.findUnique.mockResolvedValue(
        existingParticipant,
      );
      mockPrismaService.participant.delete.mockResolvedValue(
        existingParticipant,
      );

      const result = await service.deleteParticipant(participantId);

      expect(result).toEqual(existingParticipant);
      expect(mockPrismaService.participant.findUnique).toHaveBeenCalledWith({
        where: { id: participantId },
      });
      expect(mockPrismaService.participant.delete).toHaveBeenCalledWith({
        where: { id: participantId },
      });
    });

    it("should throw NotFoundException when participant does not exist", async () => {
      const participantId = 999;

      mockPrismaService.participant.findUnique.mockResolvedValue(null);

      await expect(service.deleteParticipant(participantId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.deleteParticipant(participantId)).rejects.toThrow(
        "Participant with ID 999 not found",
      );
    });
  });
});
