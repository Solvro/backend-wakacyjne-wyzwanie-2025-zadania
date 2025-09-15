import { Role } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("espense controller", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn(async (dto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await {
        id: Date.now(),
        ...dto,
      };
    }),

    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = { validateUser: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        ParticipantService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });
  it("should be defind", () => {
    expect(controller).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto = {
      userEmail: "email",
      tripId: 1,
    };

    const result = await controller.create(dto);
    expect(result).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      ...dto,
    });
    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    const dto = [
      {
        id: 1,
        userEmail: "email1",
        tripId: 1,
      },
      {
        id: 2,
        userEmail: "email2",
        tripId: 1,
      },
    ];

    mockParticipantService.findAll.mockResolvedValue(dto);

    const result = await controller.findAll();

    expect(result).toEqual(dto);
    expect(mockParticipantService.findAll).toHaveBeenCalled();
  });

  it("should return expense by id", async () => {
    const dto = {
      id: 1,
      amount: 100,
      description: "Lunch",
      createdAt: new Date(),
      tripId: 1,
    };
    mockParticipantService.findOne.mockResolvedValue(dto);

    const result = await controller.findOne("1", {
      user: {
        email: "xd",
        role: Role.ADMIN,
      },
    });

    expect(result).toEqual(dto);
    expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
  });

  it("should delete expense", async () => {
    const dto = {
      id: 1,
      amount: 100,
      description: "Lunch",
      createdAt: new Date(),
      tripId: 1,
    };
    mockParticipantService.remove.mockResolvedValue(dto);

    const result = await controller.remove("1", {
      user: {
        email: "xd",
        role: Role.ADMIN,
      },
    });
    expect(result).toEqual(dto);
    expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
  });
});
