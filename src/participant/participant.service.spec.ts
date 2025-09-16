import { TripRole } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "../participant/participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;
  let db: DatabaseService;

  const mockDb = {
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
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
    db = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
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
      (mockDb.participant.findMany as jest.Mock).mockResolvedValue(
        participants,
      );

      const result = await service.findAll();

      expect(result).toEqual(participants);
      expect(mockDb.participant.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a participant if found", async () => {
      const participant = { participant_id: 1, first_name: "Jan" };
      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(
        participant,
      );

      const result = await service.findOne(1);
      expect(result).toEqual(participant);
    });

    it("should throw if not found", async () => {
      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    it("should create a participant", async () => {
      const dto = {
        first_name: "Jan",
        last_name: "Kowalski",
        TripRole: TripRole.MEMBER,
        email: "jan@example.com",
        trip_id: 1,
      };
      const created = { participant_id: 1, ...dto };

      (mockDb.participant.create as jest.Mock).mockResolvedValue(created);

      const result = await service.create(dto as any);

      expect(result).toEqual(created);
      expect(mockDb.participant.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining(dto) }),
      );
    });
  });

  describe("update", () => {
    it("should update a participant if found", async () => {
      const existing = { participant_id: 1 };
      const updated = {
        participant_id: 1,
        first_name: "Adam",
        last_name: "Nowak",
      };

      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(existing);
      (mockDb.participant.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(1, {
        first_name: "Adam",
        last_name: "Nowak",
        TripRole: TripRole.ORGANIZER,
      } as any);

      expect(result).toEqual(updated);
      expect(mockDb.participant.update).toHaveBeenCalledWith({
        where: { participant_id: 1 },
        data: expect.objectContaining({
          first_name: "Adam",
          last_name: "Nowak",
        }),
        include: { trip: true },
      });
    });

    it("should throw if participant not found", async () => {
      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update(1, {
          first_name: "X",
          last_name: "Y",
          TripRole: TripRole.MEMBER,
        } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should remove participant if exists", async () => {
      const existing = { participant_id: 1 };
      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(existing);
      (mockDb.participant.delete as jest.Mock).mockResolvedValue(existing);

      await service.remove(1);

      expect(mockDb.participant.delete).toHaveBeenCalledWith({
        where: { participant_id: 1 },
      });
    });

    it("should throw if participant not found", async () => {
      (mockDb.participant.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
