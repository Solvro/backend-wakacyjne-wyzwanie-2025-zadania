import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ParticipantService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
