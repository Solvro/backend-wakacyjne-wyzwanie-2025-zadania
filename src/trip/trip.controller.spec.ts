import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  const mockTripService = {
    create: jest.fn((dto: Record<string, unknown>) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    update: jest.fn((id: number, dto: Record<string, unknown>) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    })
      .overrideProvider(TripService)
      .useValue(mockTripService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a trip", async () => {
    const dto = {
      name: "Test Trip",
      start: new Date("2023-03-26"),
      end: new Date("2024-03-26"),
    };

    await expect(controller.create(dto)).resolves.toEqual(
      expect.objectContaining({
        name: "Test Trip",
        start: new Date("2023-03-26"),
        end: new Date("2024-03-26"),
      }),
    );

    expect(mockTripService.create).toHaveBeenCalledWith(dto);
  });
});
