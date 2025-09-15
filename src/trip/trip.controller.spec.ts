import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("espense controller", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn(async (dto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await {
        id: Date.now(),
        ...dto,
      };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    update: jest.fn((id, dto) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id,
      ...dto,
    })),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuthService = { validateUser: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        TripService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defind", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto = {
      title: "Test trip",
      description: "",
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-07-15"),
    };

    const result = await controller.create(dto);
    expect(result).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      ...dto,
    });
    expect(mockTripService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all trips", async () => {
    const dto = [
      {
        id: 1,
        title: "Trip 1",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 2,
        title: "Trip 2",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ];

    mockTripService.findAll.mockResolvedValue(dto);

    const result = await controller.findAll();

    expect(result).toEqual(dto);
    expect(mockTripService.findAll).toHaveBeenCalled();
  });

  it("should return trips by id", async () => {
    const dto = {
      id: 1,
      title: "Trip 1",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    mockTripService.findOne.mockResolvedValue(dto);

    const result = await controller.findOne("1");

    expect(result).toEqual(dto);
    expect(mockTripService.findOne).toHaveBeenCalledWith(1);
  });

  it("should update an trip", async () => {
    const id = 1;
    const dto = {
      startDate: new Date("2027-07-01"),
      endDate: new Date("2027-07-15"),
    };

    const updatedExpense = {
      id,
      title: "Trip 1",
      description: "",
      ...dto,
    };
    mockTripService.update.mockResolvedValue(updatedExpense);

    const result = await controller.update(id.toString(), dto);

    expect(result).toEqual(updatedExpense);
    expect(mockTripService.update).toHaveBeenCalledWith(id, dto);
  });

  it("should delete expense", async () => {
    const dto = {
      id: 1,
      title: "Trip 1",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    mockTripService.remove.mockResolvedValue(dto);

    const result = await controller.remove("1");
    expect(result).toEqual(dto);
    expect(mockTripService.remove).toHaveBeenCalledWith(1);
  });
});
