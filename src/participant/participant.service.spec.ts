import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateParticipantResponseDto } from "./dto/create-participant-respone.dto";
import type { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  const mockPrismaService = {
    participant: {
      create: jest.fn(
        ({
          data,
        }: {
          data: Omit<CreateParticipantDto, "id" | "created_at" | "updated_at">;
        }) =>
          ({
            id: Date.now(),
            created_at: new Date(),
            updated_at: new Date(),
            ...data,
          }) as CreateParticipantResponseDto,
      ),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ParticipantService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create a participant", async () => {
    const dto = { name: "John Doe", email: "johnshmoe@gmail.com", trip_id: 1 };
    const participant = await service.create(dto);

    expect(participant).toHaveProperty("id");
    expect(participant).toHaveProperty("created_at");
    expect(participant).toHaveProperty("updated_at");
    expect(participant.name).toBe(dto.name);
    expect(participant.email).toBe(dto.email);
    expect(participant.trip_id).toBe(dto.trip_id);
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
        email: "Janeshmoe@gmail.com",
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    mockPrismaService.participant.findMany.mockResolvedValue(participants);

    const result = await service.findAll();
    expect(result).toBe(participants);
    expect(mockPrismaService.participant.findMany).toHaveBeenCalledTimes(1);
  });

  it("should return a participant by id", async () => {
    const participant = {
      id: 1,
      name: "John Doe",
      email: "jognshmoc@gmail.com",
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPrismaService.participant.findUnique.mockResolvedValue(participant);

    const result = await service.findOne(1);
    expect(result).toBe(participant);
    expect(mockPrismaService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
  it("should update a participant", async () => {
    const participant = {
      id: 1,
      name: "John Doe",
      email: "Johngwosdiasmdasdm@gmail.com",
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const updateData = { name: "John Smith" };
    mockPrismaService.participant.update.mockResolvedValue({
      ...participant,
      ...updateData,
    });

    const result = await service.update(1, updateData);
    expect(result).toEqual({ ...participant, ...updateData });
    expect(mockPrismaService.participant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
  });
  it("should delete a participant", async () => {
    const participant = {
      id: 1,
      name: "John Doe",
      email: "johnmarchewka@gmailcom",
      trip_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockPrismaService.participant.delete.mockResolvedValue(participant);

    const result = await service.remove(1);
    expect(result).toBe(participant);
    expect(mockPrismaService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
