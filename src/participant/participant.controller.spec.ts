import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

describe("ParticipantController", () => {
  let participantController: ParticipantController;
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockService,
        },
      ],
    }).compile();

    participantController = module.get<ParticipantController>(
      ParticipantController,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it("findAll calls service", async () => {
    mockService.findAll.mockResolvedValue([]);
    await expect(participantController.findAll()).resolves.toEqual([]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it("findOne should throw if service throws", async () => {
    mockService.findOne.mockRejectedValue(new Error("not found"));
    await expect(participantController.findOne(123)).rejects.toThrow(
      "not found",
    );
  });

  it("findOne delegates to service", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });
    await expect(participantController.findOne(1)).resolves.toMatchObject({
      id: 1,
    });
    expect(mockService.findOne).toHaveBeenCalledWith(1);
  });

  it("create delegates to service", async () => {
    const dto = { name: "A", lastname: "B", tripId: 1, email: "x@x" };
    mockService.create.mockResolvedValue({ id: 2, ...dto });
    await expect(participantController.create(dto)).resolves.toMatchObject({
      id: 2,
    });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it("update delegates to service", async () => {
    const dto = { name: "New" };
    mockService.update.mockResolvedValue({ id: 5, ...dto });
    await expect(participantController.update(5, dto)).resolves.toMatchObject({
      id: 5,
    });
    expect(mockService.update).toHaveBeenCalledWith(5, dto);
  });

  it("remove delegates to service", async () => {
    mockService.remove.mockResolvedValue({ deleted: true });
    await expect(participantController.remove(7)).resolves.toEqual({
      deleted: true,
    });
    expect(mockService.remove).toHaveBeenCalledWith(7);
  });
});
