import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../src/database/database.module";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
