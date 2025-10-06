import { Test, TestingModule } from "@nestjs/testing";
import { Gender } from "@prisma/client";

import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ResponseParticipantDto } from "./dto/response-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn().mockResolvedValue({
      name: "Charlie",
      surname: "Brown",
      age: 28,
      tripId: 103,
      userEmail: "c@example.com",
      gender: Gender.M,
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        name: "Alice",
        surname: "Smith",
        age: 30,
        tripId: 101,
        userEmail: "a@example.com",
        gender: Gender.F,
      },
      {
        name: "Bob",
        surname: "Johnson",
        age: 25,
        tripId: 102,
        userEmail: "b@example.com",
        gender: Gender.M,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      name: "Alice",
      surname: "Smith",
      age: 30,
      tripId: 101,
      userEmail: "a@example.com",
      gender: Gender.F,
    }),
    update: jest.fn().mockResolvedValue({
      name: "Updated Alice",
      surname: "Smith",
      age: 30,
      tripId: 101,
      userEmail: "a@example.com",
      gender: Gender.F,
    }),
    remove: jest.fn().mockResolvedValue(undefined),
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

  it("should create a new participant", async () => {
    const createParticipantDto: CreateParticipantDto = {
      name: "Charlie",
      surname: "Brown",
      age: 28,
      tripId: 103,
      userEmail: "c@example.com",
      gender: Gender.M,
    };

    const result: ResponseParticipantDto = {
      name: "Charlie",
      surname: "Brown",
      age: 28,
      tripId: 103,
      userEmail: "c@example.com",
      gender: Gender.M,
    };

    const response = await controller.create(createParticipantDto);

    expect(response).toEqual(result);
    expect(mockParticipantService.create).toHaveBeenCalledWith(
      createParticipantDto,
    );
  });

  it("should return all participants", async () => {
    const participantsMock: ResponseParticipantDto[] = [
      {
        name: "Alice",
        surname: "Smith",
        age: 30,
        tripId: 101,
        userEmail: "a@example.com",
        gender: Gender.F,
      },
      {
        name: "Bob",
        surname: "Johnson",
        age: 25,
        tripId: 102,
        userEmail: "b@example.com",
        gender: Gender.M,
      },
    ];

    const result = await controller.findAll();
    expect(result).toEqual(participantsMock);
    expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one participant", async () => {
    const participantMock: ResponseParticipantDto = {
      name: "Alice",
      surname: "Smith",
      age: 30,
      tripId: 101,
      userEmail: "a@example.com",
      gender: Gender.F,
    };

    const result = await controller.findOne("1");
    expect(result).toEqual(participantMock);
    expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a participant", async () => {
    const updateParticipantDto: UpdateParticipantDto = {
      name: "Updated Alice",
    };

    const updatedParticipant: ResponseParticipantDto = {
      name: "Updated Alice",
      surname: "Smith",
      age: 30,
      tripId: 101,
      userEmail: "a@example.com",
      gender: Gender.F,
    };

    const result = await controller.update("1", updateParticipantDto);
    expect(result).toEqual(updatedParticipant);
    expect(mockParticipantService.update).toHaveBeenCalledWith(
      1,
      updateParticipantDto,
    );
  });

  it("should delete a participant", async () => {
    await expect(controller.remove("1")).resolves.toBeUndefined();
    expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
  });
});
