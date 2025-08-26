import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

describe("TripController", () => {
  let controller: TripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        TripService,
        {
          provide: DatabaseService,
          useValue: {
            trip: { findMany: jest.fn(), create: jest.fn() },
            participant: { findMany: jest.fn(), create: jest.fn() },
            expense: { findMany: jest.fn(), create: jest.fn() },
          },
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
