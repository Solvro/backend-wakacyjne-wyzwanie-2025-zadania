import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

describe("TripsController", () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {
            validateToken: jest.fn(),
          },
        },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
