import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripParticipantController } from "./trip-participant.controller";
import { TripParticipantService } from "./trip-participant.service";

describe.skip("TripParticipantController", () => {
  let controller: TripParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripParticipantController],
      providers: [TripParticipantService],
    }).compile();

    controller = module.get<TripParticipantController>(
      TripParticipantController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
