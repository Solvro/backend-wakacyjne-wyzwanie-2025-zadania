import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../database/database.service";
import { TripParticipantsService } from "./trip-participants.service";

describe("TripParticipantsService", () => {
  let service: TripParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripParticipantsService, DatabaseService],
    }).compile();

    service = module.get<TripParticipantsService>(TripParticipantsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
