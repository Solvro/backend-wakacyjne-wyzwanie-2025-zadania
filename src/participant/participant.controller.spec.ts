import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockParticipantService,
        },
      ],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a participant successfully", async () => {
      const createParticipantDto: CreateParticipantDto = {
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };
      const expectedParticipant = { id: 1, ...createParticipantDto };

      mockParticipantService.create.mockResolvedValue(expectedParticipant);

      const result = await controller.create(createParticipantDto);

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.create).toHaveBeenCalledWith(
        createParticipantDto,
      );
      expect(mockParticipantService.create).toHaveBeenCalledTimes(1);
    });

    it("should create a participant with minimal data", async () => {
      const createParticipantDto: CreateParticipantDto = {
        name: "Jane",
        email: "jane@example.com",
      };
      const expectedParticipant = { id: 1, ...createParticipantDto };

      mockParticipantService.create.mockResolvedValue(expectedParticipant);

      const result = await controller.create(createParticipantDto);

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.create).toHaveBeenCalledWith(
        createParticipantDto,
      );
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

      mockParticipantService.findAll.mockResolvedValue(expectedParticipants);

      const result = await controller.findAll();

      expect(result).toEqual(expectedParticipants);
      expect(mockParticipantService.findAll).toHaveBeenCalledWith();
      expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no participants exist", async () => {
      mockParticipantService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should return a participant by id", async () => {
      const participantId = "1";
      const expectedParticipant = {
        id: 1,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };

      mockParticipantService.findOne.mockResolvedValue(expectedParticipant);

      const result = await controller.findOne(participantId);

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
      expect(mockParticipantService.findOne).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion", async () => {
      const participantId = "999";
      const expectedParticipant = {
        id: 999,
        trip_id: 1,
        name: "Test Participant",
        email: "test@example.com",
      };

      mockParticipantService.findOne.mockResolvedValue(expectedParticipant);

      const result = await controller.findOne(participantId);

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe("update", () => {
    it("should update a participant successfully", async () => {
      const participantId = "1";
      const updateParticipantDto: UpdateParticipantDto = {
        name: "John Updated",
        surname: "Doe Updated",
      };
      const expectedParticipant = {
        id: 1,
        trip_id: 1,
        name: "John Updated",
        surname: "Doe Updated",
        email: "john.doe@example.com",
      };

      mockParticipantService.update.mockResolvedValue(expectedParticipant);

      const result = await controller.update(
        participantId,
        updateParticipantDto,
      );

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.update).toHaveBeenCalledWith(
        1,
        updateParticipantDto,
      );
      expect(mockParticipantService.update).toHaveBeenCalledTimes(1);
    });

    it("should handle partial updates", async () => {
      const participantId = "1";
      const updateParticipantDto: UpdateParticipantDto = {
        email: "new.email@example.com",
      };
      const expectedParticipant = {
        id: 1,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "new.email@example.com",
      };

      mockParticipantService.update.mockResolvedValue(expectedParticipant);

      const result = await controller.update(
        participantId,
        updateParticipantDto,
      );

      expect(result).toEqual(expectedParticipant);
      expect(mockParticipantService.update).toHaveBeenCalledWith(
        1,
        updateParticipantDto,
      );
    });
  });

  describe("remove", () => {
    it("should delete a participant successfully", async () => {
      const participantId = "1";
      const deletedParticipant = {
        id: 1,
        trip_id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
      };

      mockParticipantService.remove.mockResolvedValue(deletedParticipant);

      const result = await controller.remove(participantId);

      expect(result).toEqual(deletedParticipant);
      expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
      expect(mockParticipantService.remove).toHaveBeenCalledTimes(1);
    });

    it("should handle string id parameter conversion for deletion", async () => {
      const participantId = "999";
      const deletedParticipant = {
        id: 999,
        trip_id: 1,
        name: "Test Participant",
        email: "test@example.com",
      };

      mockParticipantService.remove.mockResolvedValue(deletedParticipant);

      const result = await controller.remove(participantId);

      expect(result).toEqual(deletedParticipant);
      expect(mockParticipantService.remove).toHaveBeenCalledWith(999);
    });
  });
});
