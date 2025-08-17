import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TripController } from "./trip/trip.controller";
import { TripService } from "./trip/trip.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getBackend()).toStrictEqual(
        appController.getBackend(),
      );
    });
  });
});

describe("TripController", () => {
  let tripController: TripController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [TripService],
    }).compile();

    tripController = app.get<TripController>(TripController);
  });

  describe("root", () => {
    it("should return like trips or something", () => {
      expect(tripController.getAllTrips()).toStrictEqual(
        tripController.getAllTrips(),
      );
    });
  });
});
