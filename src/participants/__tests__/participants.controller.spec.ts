import { Test } from "@nestjs/testing";

import { ParticipantsController } from "../participants.controller";
import { ParticipantsService } from "../participants.service";

describe("ParticipantsController (unit)", () => {
  let controller: ParticipantsController;
  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [{ provide: ParticipantsService, useValue: serviceMock }],
    }).compile();

    controller = moduleRef.get(ParticipantsController);
  });

  afterEach(() => jest.clearAllMocks());

  it("POST /participants", async () => {
    serviceMock.create.mockResolvedValue({ id: 1 });
    await expect(controller.create({} as any)).resolves.toEqual({ id: 1 });
  });

  it("GET /participants", async () => {
    serviceMock.findAll.mockResolvedValue([{ id: 1 }]);
    await expect(controller.findAll()).resolves.toEqual([{ id: 1 }]);
  });

  it("GET /participants/:id", async () => {
    serviceMock.findOne.mockResolvedValue({ id: 5 });
    await expect(controller.findOne(5)).resolves.toEqual({ id: 5 });
  });

  it("PATCH /participants/:id", async () => {
    serviceMock.update.mockResolvedValue({ id: 2, name: "X" });
    await expect(controller.update(2, { name: "X" } as any)).resolves.toEqual({
      id: 2,
      name: "X",
    });
  });

  it("DELETE /participants/:id", async () => {
    serviceMock.remove.mockResolvedValue(undefined);
    await expect(controller.remove(3)).resolves.toBeUndefined();
  });
});
