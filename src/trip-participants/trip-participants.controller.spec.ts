import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripParticipantsController } from "./trip-participants.controller";
import { TripParticipantsService } from "./trip-participants.service";

describe("TripParticipantsController", () => {
  let controller: TripParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripParticipantsController],
      providers: [TripParticipantsService, DatabaseService],
    }).compile();

    controller = module.get<TripParticipantsController>(
      TripParticipantsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
