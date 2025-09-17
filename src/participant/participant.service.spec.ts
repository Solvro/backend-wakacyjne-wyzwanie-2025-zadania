import { TripRole } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  const mockDatabase = {
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantService,
        {
          provide: DatabaseService,
          useValue: mockDatabase,
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return participants", async () => {
      const participants = [
        { participant_id: 1, first_name: "Jan", last_name: "Kowalski" },
      ];

      mockDatabase.participant.findMany.mockResolvedValue(participants);

      const result = await service.findAll();

      expect(result).toEqual(participants);
      expect(mockDatabase.participant.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a participant if found", async () => {
      const participant = {
        participant_id: 1,
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@example.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      };

      mockDatabase.participant.findUnique.mockResolvedValue(participant);

      const result = await service.findOne(1);
      expect(result).toEqual(participant);
    });

    it("should throw if not found", async () => {
      mockDatabase.participant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    it("should create a participant", async () => {
      const dto: CreateParticipantDto = {
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@example.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      };

      const created: { participant_id: number } & CreateParticipantDto =
        Object.assign({ participant_id: 1 }, dto);

      mockDatabase.user.findUnique.mockResolvedValue({
        email: dto.email,
        password: "hashed",
        UserRole: "USER",
        isEnabled: true,
        name: "Jan K.",
      });
      mockDatabase.trip.findUnique.mockResolvedValue({
        trip_id: dto.trip_id,
        name: "Trip 1",
        destination: "Paris",
        start_date: new Date(),
        end_date: null,
        budget: null,
      });

      mockDatabase.participant.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created);

      expect(mockDatabase.participant.create).toHaveBeenCalledWith({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          TripRole: dto.TripRole,
          User: { connect: { email: dto.email } },
          trip: { connect: { trip_id: dto.trip_id } },
        },
        include: { trip: true },
      });
    });

    it("should throw if the trip with given id does not exist", async () => {
      const dto: CreateParticipantDto = {
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@example.com",
        TripRole: TripRole.MEMBER,
        trip_id: 999,
      };

      mockDatabase.trip.findUnique.mockResolvedValue(null);
      mockDatabase.user.findUnique.mockResolvedValue({
        email: dto.email,
        password: "hashed",
        UserRole: "USER",
        isEnabled: true,
        name: "Jan K.",
      });

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it("should throw if the user with given email does not exist", async () => {
      const dto: CreateParticipantDto = {
        first_name: "Jan",
        last_name: "Kowalski",
        email: "ghost@example.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      };

      mockDatabase.user.findUnique.mockResolvedValue(null);
      mockDatabase.trip.findUnique.mockResolvedValue({
        trip_id: dto.trip_id,
        name: "Trip 1",
        destination: "Paris",
        start_date: new Date(),
        end_date: null,
        budget: null,
      });

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a participant if found", async () => {
      const existing = { participant_id: 1 };

      const dto: UpdateParticipantDto = {
        first_name: "Adam",
        last_name: "Nowak",
        email: "adam@example.com",
        TripRole: TripRole.ORGANIZER,
        trip_id: 2,
      };

      const updated: { participant_id: number } & UpdateParticipantDto =
        Object.assign({ participant_id: 1 }, dto);

      mockDatabase.participant.findUnique.mockResolvedValue(existing);
      mockDatabase.user.findUnique.mockResolvedValue({
        email: dto.email,
        password: "hashed",
        UserRole: "USER",
        isEnabled: true,
        name: "Adam N.",
      });
      mockDatabase.trip.findUnique.mockResolvedValue({
        trip_id: 2,
        name: "Trip 2",
        destination: "Rome",
        start_date: new Date(),
        end_date: null,
        budget: null,
      });

      mockDatabase.participant.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);

      expect(result).toEqual(updated);

      expect(mockDatabase.participant.update).toHaveBeenCalledWith({
        where: { participant_id: 1 },
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          TripRole: dto.TripRole,
          User: { connect: { email: dto.email } },
          trip: { connect: { trip_id: dto.trip_id } },
        },
        include: { trip: true },
      });
    });

    it("should throw if participant not found", async () => {
      mockDatabase.participant.findUnique.mockResolvedValue(null);

      const dto: UpdateParticipantDto = {
        first_name: "X",
        last_name: "Y",
        email: "x@example.com",
        TripRole: TripRole.MEMBER,
        trip_id: 99,
      };

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });

    it("should throw if the user with given email does not exist", async () => {
      const existing = { participant_id: 1 };

      const dto: UpdateParticipantDto = {
        first_name: "Adam",
        last_name: "Nowak",
        email: "ghost@example.com",
        TripRole: TripRole.ORGANIZER,
        trip_id: 2,
      };

      mockDatabase.participant.findUnique.mockResolvedValue(existing);
      mockDatabase.user.findUnique.mockResolvedValue(null);
      mockDatabase.trip.findUnique.mockResolvedValue({
        trip_id: 2,
        name: "Trip 2",
        destination: "Rome",
        start_date: new Date(),
        end_date: null,
        budget: null,
      });

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });

    it("should throw if the trip with given id does not exist", async () => {
      const existing = { participant_id: 1 };

      const dto: UpdateParticipantDto = {
        first_name: "Adam",
        last_name: "Nowak",
        email: "adam@example.com",
        TripRole: TripRole.ORGANIZER,
        trip_id: 999,
      };

      mockDatabase.participant.findUnique.mockResolvedValue(existing);
      mockDatabase.user.findUnique.mockResolvedValue({
        email: dto.email,
        password: "hashed",
        UserRole: "USER",
        isEnabled: true,
        name: "Adam N.",
      });
      mockDatabase.trip.findUnique.mockResolvedValue(null);

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should remove participant if exists", async () => {
      const existing = { participant_id: 1 };

      mockDatabase.participant.findUnique.mockResolvedValue(existing);
      mockDatabase.participant.delete.mockResolvedValue(existing);

      await service.remove(1);

      expect(mockDatabase.participant.delete).toHaveBeenCalledWith({
        where: { participant_id: 1 },
      });
    });

    it("should throw if participant not found", async () => {
      mockDatabase.participant.findUnique.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
