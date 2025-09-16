import type { Participant } from "@prisma/client";
import { Role } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  let participantCounter = 1;

  let participantsInMemory: {
    id: number;
    email: string;
    name: string;
    role: Role;
  }[] = [];

  const initialParticipants = [
    {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      role: Role.PARTICIPANT,
    },
    {
      id: 2,
      email: "b@example.com",
      name: "Bob",
      role: Role.PARTICIPANT,
    },
  ];

  const mockParticipantService = {
    create: jest.fn((dto: Participant) => {
      const newParticipant: Participant = {
        id: participantCounter++,
        email: dto.email,
        name: dto.name,
        role: dto.role,
      };
      participantsInMemory.push(newParticipant);
      return newParticipant;
    }),
    getAll: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        { provide: ParticipantService, useValue: mockParticipantService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    participantsInMemory = [...initialParticipants];
    participantCounter = initialParticipants.length + 1;

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto = {
      email: "c@example.com",
      name: "Charlie",
      role: Role.PARTICIPANT,
    };

    const expectedValue = { id: participantCounter, ...dto };
    mockParticipantService.create.mockResolvedValue(expectedValue);

    const result = await controller.post(dto);

    expect(result).toEqual(expectedValue);
    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    const participantsMock = [...participantsInMemory];
    mockParticipantService.getAll.mockResolvedValue(participantsMock);

    const result = await controller.getAll();

    expect(result).toEqual(participantsMock);
    expect(mockParticipantService.getAll).toHaveBeenCalledTimes(1);
  });

  it("should return one participant", async () => {
    const participantMock = {
      id: 1,
      email: "a@example.com",
      name: "Alice",
      role: Role.PARTICIPANT,
    };

    mockParticipantService.getOne.mockResolvedValue(participantMock);
    const result = await controller.getOne("1");

    expect(result).toEqual(participantMock);
    expect(mockParticipantService.getOne).toHaveBeenCalledTimes(1);
  });

  it("should update a participant", async () => {
    const dto = {
      email: "c@example.com",
      name: "Charlie",
      role: Role.PARTICIPANT,
    };
    const participantMock = await controller.post(dto);

    const participantUpdated = {
      id: participantMock.id,
      email: "c@example.com",
      name: "Charles",
      role: Role.GUIDE,
    };

    const dtoUpdate = {
      name: "Charles",
      role: Role.GUIDE,
    };

    mockParticipantService.update.mockResolvedValue(participantUpdated);

    const result = await controller.update(
      String(participantMock.id),
      dtoUpdate,
    );

    expect(mockParticipantService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(participantUpdated);
    expect(mockParticipantService.update).toHaveBeenCalledWith(
      participantMock.id,
      dtoUpdate,
    );
  });

  it("should delete a participant", async () => {
    mockParticipantService.delete.mockResolvedValue();

    await expect(controller.delete("1")).resolves.toBeUndefined();

    expect(mockParticipantService.delete).toHaveBeenCalledTimes(1);
    expect(mockParticipantService.delete).toHaveBeenCalledWith(1);
  });
});
