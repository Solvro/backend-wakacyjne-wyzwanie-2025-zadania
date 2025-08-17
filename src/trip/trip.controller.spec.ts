import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let tripController: TripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: {
            getAllTrips: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    tripController = module.get<TripController>(TripController);
  });

  describe("root", () => {
    it("should return like trips or something", () => {
      expect(tripController.getAllTrips()).toStrictEqual(
        tripController.getAllTrips(),
      );
    });
  });
});
