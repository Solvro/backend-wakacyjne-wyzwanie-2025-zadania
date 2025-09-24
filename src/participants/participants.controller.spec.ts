import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

describe("ParticipantsController", () => {
  let controller: ParticipantsController;

  const mockParticipantsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [
        {
          provide: ParticipantsService,
          useValue: mockParticipantsService,
        },
      ],
    }).compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new participant", async () => {
      const createParticipantDto = {
        name: "Test User",
        email: "test@test.com",
        password: "password123",
      };
      const mockCreatedUser = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
        password: "temporary",
      };
      mockParticipantsService.create.mockResolvedValue(mockCreatedUser);

      const result = await controller.create(createParticipantDto);

      expect(result).toEqual(mockCreatedUser);
      expect(mockParticipantsService.create).toHaveBeenCalledWith(
        createParticipantDto,
      );
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const mockUsers = [
        { id: 1, name: "User 1", email: "user1@test.com" },
        { id: 2, name: "User 2", email: "user2@test.com" },
      ];
      mockParticipantsService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockParticipantsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a participant by id", async () => {
      const mockUser = { id: 1, name: "User 1", email: "user1@test.com" };
      mockParticipantsService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne("1");

      expect(result).toEqual(mockUser);
      expect(mockParticipantsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a participant", async () => {
      const updateData = { name: "Updated User" };
      const mockUpdatedUser = {
        id: 1,
        name: "Updated User",
        email: "user1@test.com",
      };
      mockParticipantsService.update.mockResolvedValue(mockUpdatedUser);

      const result = await controller.update("1", updateData);

      expect(result).toEqual(mockUpdatedUser);
      expect(mockParticipantsService.update).toHaveBeenCalledWith(
        1,
        updateData,
      );
    });
  });

  describe("remove", () => {
    it("should delete a participant", async () => {
      const mockDeletedUser = { id: 1 };
      mockParticipantsService.remove.mockResolvedValue(mockDeletedUser);

      const result = await controller.remove("1");

      expect(result).toEqual(mockDeletedUser);
      expect(mockParticipantsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
