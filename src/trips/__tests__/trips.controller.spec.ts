import type { Request } from "express";

import { Test } from "@nestjs/testing";

import type { JwtPayload } from "../../common/types";
import { UserRole } from "../../common/types";
import type { UpdateTripDto } from "../dto/update-trip.dto";
import { TripAccessService } from "../trip-access.service";
import { TripsController } from "../trips.controller";
import { TripsService } from "../trips.service";

type RequestWithUser = Request & { user: JwtPayload };

describe("TripsController (unit)", () => {
  let controller: TripsController;

  const tripsServiceMock = { updateAs: jest.fn() };
  const accessMock = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        { provide: TripsService, useValue: tripsServiceMock },
        { provide: TripAccessService, useValue: accessMock },
      ],
    }).compile();

    controller = moduleRef.get(TripsController);
  });

  afterEach(() => jest.clearAllMocks());

  it("PATCH /trips/:tripId", async () => {
    tripsServiceMock.updateAs.mockResolvedValue({ id: 1, name: "X" });
    const request = {
      user: { sub: 123, role: UserRole.USER },
    } as RequestWithUser;
    const updateDto: UpdateTripDto = { name: "X" };

    await expect(controller.update(1, updateDto, request)).resolves.toEqual({
      id: 1,
      name: "X",
    });

    expect(tripsServiceMock.updateAs).toHaveBeenCalledWith(
      { sub: 123, role: UserRole.USER },
      1,
      { name: "X" },
    );
  });
});
