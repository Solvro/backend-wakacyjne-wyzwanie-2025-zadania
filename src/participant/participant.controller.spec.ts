import { Role } from "@prisma/client";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import type { PaginationDto } from "src/pagination/pagination.dto";

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
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [ParticipantService],
      imports: [AuthModule, DatabaseModule],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a new record", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockParticipantService.create.mockReturnValue(dto);

    const result = await controller.create(dto);

    expect(result).toEqual(dto);
    expect(mockParticipantService.create).toHaveBeenCalledTimes(1);
  });

  it("should update an exisiting participant", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockParticipantService.create.mockReturnValue(dto);

    const resultCreate = await controller.create(dto);

    expect(resultCreate.email).toBe("janusz@example.com");

    const dtoUpdate = {
      name: "janek",
    };

    const updateParticipant = { ...dto, ...dtoUpdate };

    mockParticipantService.update.mockReturnValue(updateParticipant);

    const result = await controller.update(dto.participant_id, dtoUpdate);

    expect(result.name).toBe("janek");
    expect(mockParticipantService.update).toHaveBeenCalled();
    expect(mockParticipantService.update).toHaveBeenCalledTimes(1);
  });

  it("should find one record by id", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };

    mockParticipantService.findOne.mockReturnValue(dto);

    const result = await controller.findOne(1);

    expect(result).toHaveProperty("participant_id", 1);
    expect(mockParticipantService.findOne).toHaveBeenCalledTimes(1);
    expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
  });

  it("should find many records", async () => {
    const dto = {
      participant_id: 1,
      name: "Janusz",
      email: "janusz@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };
    const dto1 = {
      participant_id: 2,
      name: "Janusz2",
      email: "janusz2@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    };
    mockParticipantService.findAll.mockReturnValue([dto, dto1]);
    const paginationDto: PaginationDto = { limit: 10, skip: 0 };
    const result = await controller.findAll(paginationDto);

    expect(result).toHaveLength(2);
    expect(mockParticipantService.findAll).toHaveBeenCalled();
    expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
  });
});
