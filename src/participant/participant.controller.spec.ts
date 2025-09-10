import type { participant } from "@prisma/client";

import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;
  let service: ParticipantService;

  const mockParticipantService = {
    create: jest.fn<Promise<participant>, [CreateParticipantDto]>(),
    findAll: jest.fn<Promise<participant[]>, []>(),
    findOne: jest.fn<Promise<participant | null>, [number]>(),
    update: jest.fn<Promise<participant>, [number, UpdateParticipantDto]>(),
    remove: jest.fn<Promise<participant>, [number]>(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockRoleGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockParticipantService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockRoleGuard)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("powinien być zdefiniowany", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("powinien utworzyć nowego uczestnika", async () => {
      const dto: CreateParticipantDto = {
        name: "Jan",
        surname: "Kowalski",
        age: 30,
      };

      const expectedResult: participant = {
        id: 1,
        name: "Jan",
        surname: "Kowalski",
        age: 30,
        email: null,
      } as participant;

      // Typujemy zwracaną wartość
      mockParticipantService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("powinien zwrócić wszystkich uczestników", async () => {
      const participants: participant[] = [
        { id: 1, name: "Jan", surname: "Kowalski", age: 30, email: null },
        {
          id: 2,
          name: "Anna",
          surname: "Nowak",
          age: 25,
          email: "anna@test.com",
        },
      ] as participant[];

      mockParticipantService.findAll.mockResolvedValue(participants);

      const result = await controller.findAll();

      expect(result).toEqual(participants);
      expect(mockParticipantService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("powinien zwrócić uczestnika po ID", async () => {
      const participant: participant = {
        id: 1,
        name: "Jan",
        surname: "Kowalski",
        age: 30,
        email: null,
      } as participant;

      mockParticipantService.findOne.mockResolvedValue(participant);

      const result = await controller.findOne("1");

      expect(result).toEqual(participant);
      expect(mockParticipantService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("powinien zaktualizować uczestnika", async () => {
      const dto: UpdateParticipantDto = { name: "Maciej" };
      const expectedResult: participant = {
        id: 1,
        name: "Maciej",
        surname: "Kowalski",
        age: 30,
        email: null,
      } as participant;

      // POPRAWIONE: Typujemy zwracaną wartość
      mockParticipantService.update.mockResolvedValue(expectedResult);

      const result = await controller.update("1", dto);

      expect(result).toEqual(expectedResult);
      expect(mockParticipantService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("powinien usunąć uczestnika po ID", async () => {
      const deletedParticipant: participant = {
        id: 1,
        name: "Jan",
        surname: "Kowalski",
        age: 30,
        email: null,
      } as participant;

      mockParticipantService.remove.mockResolvedValue(deletedParticipant);

      const result = await controller.remove("1");

      expect(result).toEqual(deletedParticipant);
      expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
    });
  });
});
