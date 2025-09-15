import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "src/auth/dto/request-with-user.dto";
import type { UserMetadata } from "src/users/dto/user-metadata.dto";

import type { CanActivate } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

const mockParticipantService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

class MockAuthGuard implements CanActivate {
  canActivate() {
    return true;
  }
}

describe("ParticipantController", () => {
  let controller: ParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockParticipantService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  afterEach(() => jest.clearAllMocks());

  describe("create", () => {
    it("should create a participant", async () => {
      const dto: CreateParticipantDto = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      const user: UserMetadata = {
        userId: 1,
        email: "john@example.com",
        role: Role.USER,
      };
      const mockRequest: RequestWithUser = { user } as RequestWithUser;
      const result = {
        participant_id: 1,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
      };

      mockParticipantService.create.mockResolvedValue(result);

      expect(await controller.create(dto, mockRequest)).toEqual(result);
      expect(mockParticipantService.create).toHaveBeenCalledWith(dto, user);
    });

    it("should throw if user missing from request", async () => {
      await expect(
        controller.create(
          { firstName: "John", lastName: "Doe", email: "john@example.com" },
          { user: undefined } as RequestWithUser,
        ),
      ).rejects.toThrow("Authenticated user not found in request");
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const user: UserMetadata = {
        userId: 1,
        email: "john@example.com",
        role: Role.USER,
      };
      const result = [{ participant_id: 1 }, { participant_id: 2 }];
      mockParticipantService.findAll.mockResolvedValue(result);

      expect(await controller.findAll({ user } as RequestWithUser)).toEqual(
        result,
      );
      expect(mockParticipantService.findAll).toHaveBeenCalledWith(user);
    });
  });

  describe("findOne", () => {
    it("should return one participant", async () => {
      const user: UserMetadata = {
        userId: 1,
        email: "john@example.com",
        role: Role.USER,
      };
      const result = { participant_id: 1, firstName: "John" };
      mockParticipantService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1, { user } as RequestWithUser)).toEqual(
        result,
      );
      expect(mockParticipantService.findOne).toHaveBeenCalledWith(1, user);
    });

    it("should throw if user missing from request", async () => {
      await expect(
        controller.findOne(1, { user: undefined } as RequestWithUser),
      ).rejects.toThrow("Authenticated user not found in request");
    });
  });

  describe("update", () => {
    it("should update a participant", async () => {
      const user: UserMetadata = {
        userId: 1,
        email: "john@example.com",
        role: Role.USER,
      };
      const dto: UpdateParticipantDto = { firstName: "Jane" };
      const result = { participant_id: 1, firstName: "Jane" };
      mockParticipantService.update.mockResolvedValue(result);

      expect(
        await controller.update(1, dto, { user } as RequestWithUser),
      ).toEqual(result);
      expect(mockParticipantService.update).toHaveBeenCalledWith(1, dto, user);
    });
  });

  describe("remove", () => {
    it("should remove a participant", async () => {
      const user = { userId: 1 };
      const result = { message: "Participant deleted successfully" };
      mockParticipantService.remove.mockResolvedValue(result);

      expect(await controller.remove(1, { user } as RequestWithUser)).toEqual(
        result,
      );
      expect(mockParticipantService.remove).toHaveBeenCalledWith(1, user);
    });
  });
});
