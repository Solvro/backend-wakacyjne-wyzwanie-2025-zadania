/* eslint-disable @typescript-eslint/unbound-method */
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;
  let service: ParticipantService;

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
      providers: [ParticipantService],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
    service = module.get<ParticipantService>(ParticipantService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto: CreateParticipantDto = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const created = { id: 1, dto };
    mockParticipantService.create.mockResolvedValue(created);

    const result = await controller.create(dto);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    const participants = [
      { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    ];
    mockParticipantService.findAll.mockResolvedValue(participants);

    const result = await controller.findAll();

    expect(result).toEqual(participants);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should return one participant", async () => {
    const participant = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };
    mockParticipantService.findOne.mockResolvedValue(participant);

    const result = await controller.findOne("1");

    expect(result).toEqual(participant);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a participant", async () => {
    const dto: UpdateParticipantDto = { firstName: "Johnny" };
    const updated = {
      id: 1,
      firstName: "Johnny",
      lastName: "Doe",
      email: "john@example.com",
    };
    mockParticipantService.update.mockResolvedValue(updated);

    const result = await controller.update("1", dto);

    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it("should delete a participant", async () => {
    const removed = { id: 1 };
    mockParticipantService.remove.mockResolvedValue(removed);

    const result = await controller.remove("1");

    expect(result).toEqual(removed);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
