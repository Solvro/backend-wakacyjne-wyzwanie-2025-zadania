import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TripParticipantService } from "./trip-participant.service";

describe.skip("TripParticipantService", () => {
  let service: TripParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripParticipantService],
    }).compile();

    service = module.get<TripParticipantService>(TripParticipantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
