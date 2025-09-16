import { AccountType, Role } from "@prisma/client";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { validParticipant } from "../../test/test-utils";
import { AuthGuard } from "../auth/auth.guard";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateAny: jest.fn(),
    updateSelf: jest.fn(),
    deleteAny: jest.fn(),
    deleteSelf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [ParticipantService],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new participant", async () => {
    const dto = await validParticipant();
    const expected = {
      id: 1,
      ...dto,
    };

    mockParticipantService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    const mockParticipants = [
      {
        id: 1,
        ...(await validParticipant()),
      },
      {
        id: 2,
        ...(await validParticipant()),
      },
    ];

    mockParticipantService.findAll.mockResolvedValue(mockParticipants);

    const result = await controller.findAll();

    expect(result).toEqual(mockParticipants);
    expect(result.length).toEqual(mockParticipants.length);
  });
  it("should return a single participant with given id", async () => {
    const expected = {
      id: 1,
      ...(await validParticipant()),
    };

    mockParticipantService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne(5);

    expect(result).toEqual(expected);
    expect(mockParticipantService.findOne).toHaveBeenCalledWith(5);
  });

  it("should update a participant", async () => {
    const expected = {
      id: 1,
      ...(await validParticipant()),
    };
    const metadata = {
      participant: {
        id: 1,
        email: "abc@example.com",
        role: Role.ADMIN,
        account_type: AccountType.BASIC,
      },
    };

    mockParticipantService.updateAny.mockResolvedValue(expected);

    const result = await controller.update(metadata, { name: "Jan" });

    expect(result).toEqual(expected);
    expect(mockParticipantService.updateAny).toHaveBeenCalledWith({
      name: "Jan",
    });
  });

  it("should delete a participant", async () => {
    const expected = {
      id: 1,
      ...(await validParticipant()),
    };

    const metadata = {
      participant: {
        id: 1,
        email: "abc@example.com",
        role: Role.ADMIN,
        account_type: AccountType.BASIC,
      },
    };

    mockParticipantService.deleteAny.mockResolvedValue(expected);

    const result = await controller.remove(metadata, { id: 1 });

    expect(result).toEqual(expected);
    expect(mockParticipantService.deleteAny).toHaveBeenCalledWith(1);
  });
});
