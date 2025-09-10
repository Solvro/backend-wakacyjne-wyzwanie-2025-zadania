import { Sex } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  let participantCounter = 1;

  let participantsInMemory: {
    participantId: number;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  const initialParticipants = [
    {
      participantId: 1,
      firstName: "A",
      lastName: "B",
      email: "C",
      address: "W",
      phoneNumber: "2137",
      sex: Sex.OTHER,
    },
    {
      participantId: 2,
      firstName: "D",
      lastName: "E",
      email: "F",
      address: "F",
      phoneNumber: "123123",
      sex: Sex.FEMALE,
    },
  ];

  interface Participant {
    data: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      phoneNumber: string;
      sex: Sex;
    };
  }

  const mockParticipantService = {
    create: jest.fn(({ data }: Participant) => {
      const newParticipant = { participantId: participantCounter++, ...data };
      participantsInMemory.push(newParticipant);
      return newParticipant;
    }) as jest.Mock,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    const expectedValue = { participantId: participantCounter, ...dto };
    mockParticipantService.create.mockResolvedValue(expectedValue);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedValue);

    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    const participantsMock = [...participantsInMemory];

    mockParticipantService.findAll.mockResolvedValue(participantsMock);

    const result = await controller.findAll();

    expect(result).toEqual(participantsMock);
    expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one participant", async () => {
    const participantMock = {
      participantId: 1,
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    mockParticipantService.findOne.mockResolvedValue(participantMock);
    const result = await controller.findOne(1);

    expect(result).toEqual(participantMock);
    expect(mockParticipantService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should update a participant", async () => {
    const dto = {
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };
    const participantMock = await controller.create(dto); // id == 3

    const participantUpdated = {
      participantId: participantMock.participantId,
      firstName: "G",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    const dtoUpdate = {
      firstName: "G",
    };

    mockParticipantService.update.mockResolvedValue(participantUpdated);

    const result = await controller.update(
      participantMock.participantId,
      dtoUpdate,
    );

    expect(mockParticipantService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(participantUpdated);
    expect(mockParticipantService.update).toHaveBeenCalledWith(3, dtoUpdate);
  });

  it("should delete a participant", async () => {
    const participantMock = {
      participantId: 1,
      firstName: "Q",
      lastName: "A",
      email: "Z",
      address: "F",
      phoneNumber: "5555",
      sex: Sex.MALE,
    };

    mockParticipantService.remove.mockResolvedValue(participantMock);

    const result = await controller.remove(1);

    expect(result).toEqual(participantMock);
    expect(mockParticipantService.remove).toHaveBeenCalled();
    expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
  });
});
