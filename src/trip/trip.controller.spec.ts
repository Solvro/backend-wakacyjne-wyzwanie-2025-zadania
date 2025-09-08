import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing/testing-module";

import { TripController } from "./trip.controller";

describe("TripController", () => {
  let controller: TripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
