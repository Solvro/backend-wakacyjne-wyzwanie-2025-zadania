import { TripRole } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn((dto: CreateParticipantDto) =>
      Object.assign({ participant_id: 1 }, dto),
    ),
    findAll: jest.fn(() => [
      {
        participant_id: 1,
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@test.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      },
    ]),
    findOne: jest.fn((id: number) => {
      if (id === 1) {
        return {
          participant_id: 1,
          first_name: "Jan",
          last_name: "Kowalski",
          email: "jan@test.com",
          TripRole: TripRole.MEMBER,
          trip_id: 1,
        };
      }
      throw new NotFoundException();
    }),
    update: jest.fn((id: number, dto: UpdateParticipantDto) =>
      Object.assign({ participant_id: id }, dto),
    ),
    remove: jest.fn((id: number) => {
      if (id !== 1) {
        throw new NotFoundException();
      }
      return { participant_id: id };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [ParticipantService],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a participant", async () => {
      const dto: CreateParticipantDto = {
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@test.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      };

      const result = await controller.create(dto);

      expect(result).toEqual(Object.assign({ participant_id: 1 }, dto));
      expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const result = await controller.findAll();

      expect(result).toHaveLength(1);
      expect(mockParticipantService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return one participant", async () => {
      const result = await controller.findOne(1);
      expect(result.participant_id).toBe(1);
      expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if participant not found", async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a participant", async () => {
      const dto: UpdateParticipantDto = {
        first_name: "Adam",
        last_name: "Nowak",
        email: "adam@test.com",
        TripRole: TripRole.ORGANIZER,
        trip_id: 2,
      };

      const result = await controller.update(1, dto);

      expect(result).toEqual(Object.assign({ participant_id: 1 }, dto));
      expect(mockParticipantService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove a participant", async () => {
      await controller.remove(1);
      expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if participant not found", async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
