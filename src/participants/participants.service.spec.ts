import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ParticipantsService } from "./participants.service";

describe("ParticipantsService", () => {
  let service: ParticipantsService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

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
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
      mockPrismaService.user.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(createParticipantDto);

      expect(result).toEqual(mockCreatedUser);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: createParticipantDto.name,
          email: createParticipantDto.email,
          password: expect.stringMatching(/.+/) as string,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return all participants", async () => {
      const mockUsers = [
        { id: 1, name: "User 1", email: "user1@test.com" },
        { id: 2, name: "User 2", email: "user2@test.com" },
      ];
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    });
  });

  describe("findOne", () => {
    it("should return a participant by id", async () => {
      const mockUser = { id: 1, name: "User 1", email: "user1@test.com" };
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
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
      mockPrismaService.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await service.update(1, updateData);

      expect(result).toEqual(mockUpdatedUser);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    });
  });

  describe("remove", () => {
    it("should delete a participant", async () => {
      const mockDeletedUser = { id: 1 };
      mockPrismaService.user.delete.mockResolvedValue(mockDeletedUser);

      const result = await service.remove(1);

      expect(result).toEqual(mockDeletedUser);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
