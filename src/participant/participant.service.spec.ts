import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { ParticipantService } from "./participant.service";

describe("ParticipantService", () => {
  let service: ParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService, PrismaService],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
