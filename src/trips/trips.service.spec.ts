import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "./trips.service";

describe("TripsService", () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        PrismaService,
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
