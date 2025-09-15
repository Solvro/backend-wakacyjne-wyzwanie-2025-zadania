import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import type { CreateParticipantResponseDto } from "./dto/create-participant-respone.dto";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import type { UpdateParticipantDto } from "./dto/update-participant.dto";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let controller: ParticipantController;

  const mockParticipantService = {
    create: jest.fn(
      (dto: CreateParticipantDto): CreateParticipantResponseDto => ({
        id: Date.now(),
        name: dto.name,
        email: dto.email,
        trip_id: dto.trip_id,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    ),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn((id: number, dto: UpdateParticipantDto) => ({
      id,
      name: dto.name ?? "Default Name",
      email: dto.email ?? "Default mail",
      created_at: new Date(),
      updated_at: new Date(),
    })),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        ParticipantService,
        {
          provide: AuthService,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    })
      .overrideProvider(ParticipantService)
      .useValue(mockParticipantService)
      .compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const dto = { name: "John Doe", email: "johnshmoe@gmail.com", trip_id: 1 };
    const result = await controller.create(dto);
    expect(result).toHaveProperty("id", expect.any(Number));
    expect(result).toHaveProperty("name", dto.name);
    expect(result).toHaveProperty("email", dto.email);
    expect(result).toHaveProperty("created_at", expect.any(Date));
    expect(result).toHaveProperty("updated_at", expect.any(Date));

    expect(mockParticipantService.create).toHaveBeenCalledWith(dto);
    expect(mockParticipantService.create).toHaveBeenCalledTimes(1);
  });

  it("should update a user", async () => {
    const dto = { name: "John Smith", email: "josdjao@gmail.com" };
    const participant = await controller.update("1", dto);

    expect(participant).toHaveProperty("id", expect.any(Number));
    expect(participant).toHaveProperty("name", dto.name);
    expect(participant).toHaveProperty("email", dto.email);
    expect(participant).toHaveProperty("created_at", expect.any(Date));
    expect(participant).toHaveProperty("updated_at", expect.any(Date));
    expect(mockParticipantService.update).toHaveBeenCalled();
  });

  it("should return all participants", async () => {
    const participants = [
      {
        id: 1,
        name: "John Doe",
        email: "johnshmoe@gmail.com",
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "janeshmoe@gmail.com",
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    mockParticipantService.findAll.mockResolvedValue(participants);

    const result = await controller.findAll();

    expect(result).toEqual(participants);
    expect(mockParticipantService.findAll).toHaveBeenCalled();
  });

  it("should remove a participant", async () => {
    await controller.remove("1");
    expect(mockParticipantService.remove).toHaveBeenCalledWith(1);
  });
});
