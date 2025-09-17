/* eslint-disable @typescript-eslint/unbound-method */
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/role/role.guard";
import type { ParticipantResponseDto } from "./dto/participant-response.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

describe("ParticipantsController", () => {
  let controller: ParticipantsController;
  let service: jest.Mocked<ParticipantsService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const mockRoleGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [
        { provide: ParticipantsService, useValue: mockService },
        { provide: AuthService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
    service = module.get(ParticipantsService);
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const participants = [{ id: 1 } as ParticipantResponseDto];
      service.findAll.mockResolvedValue(participants);
      expect(await controller.findAll()).toBe(participants);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a participant by id", async () => {
      const participant = { id: 1 };
      service.findOne.mockResolvedValue(participant as ParticipantResponseDto);
      expect(await controller.findOne(1)).toBe(participant);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should return null if participant not found", async () => {
      service.findOne.mockResolvedValue(null);
      expect(await controller.findOne(1)).toBeNull();
    });
  });

  describe("update", () => {
    it("should update participant", async () => {
      const dto: UpdateParticipantDto = {
        trip_id: 2,
        user_email: "test@mail.com",
      };
      const participant = { id: 1 };
      service.update.mockResolvedValue(participant as ParticipantResponseDto);
      expect(await controller.update(1, dto)).toBe(participant);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove participant by id", async () => {
      const participant = { id: 1 };
      service.remove.mockResolvedValue(participant as ParticipantResponseDto);
      expect(await controller.remove(1)).toBe(participant);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
