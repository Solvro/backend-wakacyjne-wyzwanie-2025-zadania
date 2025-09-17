import type { PrismaClient } from "@prisma/client";

import { ForbiddenException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../../../prisma/prisma.service";
import type { JwtPayload } from "../../common/types";
import { UserRole } from "../../common/types";
import type { UpdateTripDto } from "../dto/update-trip.dto";
import { TripAccessService } from "../trip-access.service";
import { TripsService } from "../trips.service";

type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

describe("TripsService (unit)", () => {
  let service: TripsService;

  const tx = {
    trip: { update: jest.fn() },
  };
  const prismaMock = {
    $transaction: jest.fn(
      async (
        callback: (txClient: PrismaTransactionClient) => Promise<unknown>,
      ) => callback(tx as unknown as PrismaTransactionClient),
    ),
  };
  const accessMock = {
    assertCoordinatorOrAdmin: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TripsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: TripAccessService, useValue: accessMock },
      ],
    }).compile();

    service = moduleRef.get(TripsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("updateAs() rzuca błąd, gdy użytkownik nie ma uprawnień", async () => {
    const expectedError = new ForbiddenException("Brak uprawnień");
    accessMock.assertCoordinatorOrAdmin.mockRejectedValue(expectedError);

    const user: Pick<JwtPayload, "sub" | "role"> = {
      sub: 10,
      role: UserRole.USER,
    };
    const dto: UpdateTripDto = { name: "Tatry" };

    await expect(service.updateAs(user, 1, dto)).rejects.toThrow(expectedError);

    expect(tx.trip.update).not.toHaveBeenCalled();
  });
});
