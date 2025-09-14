import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let database: DatabaseService;

  const mockDatabaseService = {
    user: {
      findFirstOrThrow: jest.fn(),
    },
    trip: {
      findFirstOrThrow: jest.fn(),
    },
    participant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

  describe("create", () => {
    it("should create a participant when user and trip exist", async () => {
      const dto = { userEmail: "test@example.com", tripId: 1 };

      database.user.findFirstOrThrow.mockResolvedValue({
        id: 10,
        email: dto.userEmail,
      });
      database.trip.findFirstOrThrow.mockResolvedValue({
        id: dto.tripId,
        title: "Trip",
      });
      database.participant.create.mockResolvedValue({
        id: 1,
        ...dto,
      });

      const result = await service.create(dto);

      expect(result).toEqual({ id: 1, ...dto });
      expect(database.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: { email: dto.userEmail },
      });
      expect(database.trip.findFirstOrThrow).toHaveBeenCalledWith({
        where: { id: dto.tripId },
      });
      expect(database.participant.create).toHaveBeenCalledWith({
        data: dto,
      });
    });

    it("should throw NotFoundException if user does not exist", async () => {
      const dto = { userEmail: "missing@example.com", tripId: 1 };

      database.user.findFirstOrThrow.mockRejectedValue(new Error("Not found"));

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it("should throw NotFoundException if trip does not exist", async () => {
      const dto = { userEmail: "test@example.com", tripId: 99 };

      database.user.findFirstOrThrow.mockResolvedValue({
        id: 1,
        email: dto.userEmail,
      });
      database.trip.findFirstOrThrow.mockRejectedValue(new Error("Not found"));

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const mockParticipants = [{ id: 1 }, { id: 2 }];
      database.participant.findMany.mockResolvedValue(mockParticipants);

      const result = await service.findAll();

      expect(result).toEqual(mockParticipants);
      expect(database.participant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return one participant", async () => {
      const mockParticipant = { id: 1, userEmail: "test@example.com" };
      database.participant.findUnique.mockResolvedValue(mockParticipant);

      const result = await service.findOne(1);

      expect(result).toEqual(mockParticipant);
      expect(database.participant.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("remove", () => {
    it("should remove a participant", async () => {
      const mockParticipant = { id: 1, userEmail: "test@example.com" };
      database.participant.delete.mockResolvedValue(mockParticipant);

      const result = await service.remove(1);

      expect(result).toEqual(mockParticipant);
      expect(database.participant.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
