import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

describe("participant service", () => {
  let service: ParticipantService;

  const mockDatabaseService = {
    participant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: jest.fn(({ data }) => ({
        id: Date.now(),
        ...data,
      })),
      delete: jest.fn(),
    },
    user: {
      findFirstOrThrow: jest.fn().mockResolvedValue({
        email: "email",
      }),
    },
    trip: {
      findFirstOrThrow: jest.fn().mockResolvedValue({
        id: 1,
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
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
    const dto = {
      userEmail: "email",
      tripId: 1,
    };
    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.tripId).toBe(1);
    expect(result.userEmail).toBe("email");

    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: dto,
    });

    const created = await service.create(dto);
    expect(created).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      ...dto,
    });
  });

  it("should return all participants", async () => {
    const mockParticipants = [
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

    mockDatabaseService.participant.findMany.mockResolvedValue(
      mockParticipants,
    );

    const result = await service.findAll();

    expect(result).toEqual(mockParticipants);
    expect(mockDatabaseService.participant.findMany).toHaveBeenCalled();
  });

  it("should return one participant", async () => {
    const mockParticipant = {
      id: 1,
      userEmail: "email1",
      tripId: 1,
    };
    mockDatabaseService.participant.findUnique.mockResolvedValue(
      mockParticipant,
    );

    const result = await service.findOne(1);

    expect(result).toEqual(mockParticipant);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should remove a participant", async () => {
    const mockParticipant = { id: 1, userEmail: "test@example.com" };
    mockDatabaseService.participant.delete.mockResolvedValue(mockParticipant);

    const result = await service.remove(1);

    expect(result).toEqual(mockParticipant);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
