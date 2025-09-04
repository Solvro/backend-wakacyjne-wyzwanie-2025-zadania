import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

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
        { provide: ParticipantService, useValue: mockParticipantService },
      ],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
