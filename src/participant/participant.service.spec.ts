import type { Participant } from "@prisma/client";

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { ParticipantService } from "./participant.service";

const mockDatabaseService = {
  participant: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(({ data }: { data: Partial<Participant> }) => ({
      id: Date.now(),
      ...data,
    })),
    update: jest.fn(
      ({
        where,
        data,
      }: {
        where: { id: number };
        data: Partial<Participant>;
      }) => ({
        id: where.id,
        ...data,
      }),
    ),
    delete: jest.fn(({ where }: { where: { id: number } }) => ({
      id: where.id,
    })),
  },
};

describe("ParticipantService", () => {
  let service: ParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a participant", async () => {
    const dto = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
    expect(result.firstName).toBe("John");
    expect(mockDatabaseService.participant.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it("should return all participants", async () => {
    mockDatabaseService.participant.findMany.mockResolvedValue([
      { id: 1, first_name: "Alice", last_name: "Smith" },
      { id: 2, first_name: "Bob", last_name: "Johnson" },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(2);
    expect(mockDatabaseService.participant.findMany).toHaveBeenCalled();
  });

  it("should return one participant by id", async () => {
    mockDatabaseService.participant.findUnique.mockResolvedValue({
      id: 1,
      first_name: "Alice",
      last_name: "Smith",
    });

    const result = await service.findOne(1);

    expect(result).toHaveProperty("id", 1);
    expect(mockDatabaseService.participant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { trips: true, paidExpenses: true },
    });
  });

  it("should update a participant", async () => {
    const dto = { firstName: "Updated" };

    const result = await service.update(1, dto);

    expect(result).toEqual({ id: 1, firstName: "Updated" });
    expect(mockDatabaseService.participant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
  });

  it("should delete a participant", async () => {
    const result = await service.remove(1);

    expect(result).toHaveProperty("success", true);
    expect(mockDatabaseService.participant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
