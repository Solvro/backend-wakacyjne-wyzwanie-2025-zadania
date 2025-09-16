import { TripRole } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [
      {
        id: 1,
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@test.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      },
    ]),
    findOne: jest.fn((id) => {
      if (id === 1) {
        return {
          id,
          first_name: "Jan",
          last_name: "Kowalski",
          email: "jan@test.com",
          TripRole: TripRole.MEMBER,
          trip_id: 1,
        };
      }
      throw new NotFoundException();
    }),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => {
      if (id !== 1) throw new NotFoundException();
      return { id };
    }),
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
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto = {
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan@test.com",
      TripRole: TripRole.MEMBER,
      trip_id: 1,
    };

    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all participants", async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan@test.com",
        TripRole: TripRole.MEMBER,
        trip_id: 1,
      },
    ]);
    expect(mockParticipantService.findAll).toHaveBeenCalled();
  });

  it("should return one participant", async () => {
    expect(await controller.findOne("1")).toEqual({
      id: 1,
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan@test.com",
      TripRole: TripRole.MEMBER,
      trip_id: 1,
    });
    expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
  });

  it("should throw NotFoundException if participant not found", async () => {
    await expect(controller.findOne("99")).rejects.toThrow(NotFoundException);
  });

  it("should update a participant", async () => {
    const dto = {
      first_name: "Adam",
      last_name: "Nowak",
      email: "adam@test.com",
      TripRole: TripRole.ORGANIZER,
      trip_id: 2,
    };
    expect(await controller.update("1", dto)).toEqual({ id: 1, ...dto });
    expect(mockParticipantService.update).toHaveBeenCalledWith(1, dto);
  });

  it("should remove a participant", async () => {
    await controller.remove(1);
    expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
  });

  it("should throw NotFoundException if participant to remove not found", async () => {
    await expect(controller.remove(99)).rejects.toThrow(NotFoundException);
  });
});
