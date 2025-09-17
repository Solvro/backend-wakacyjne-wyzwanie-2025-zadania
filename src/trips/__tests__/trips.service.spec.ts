import { Test } from "@nestjs/testing";

import { PrismaService } from "../../../prisma/prisma.service";
import { TripAccessService } from "../trip-access.service";
import { TripsService } from "../trips.service";

describe("TripsService (unit)", () => {
  let service: TripsService;

  const tx = {
    trip: { update: jest.fn() },
  };
  const prismaMock = {
    $transaction: jest.fn((function_: any) => function_(tx)),
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

  it("updateAs() wymaga uprawnień i aktualizuje trip", async () => {
    accessMock.assertCoordinatorOrAdmin.mockResolvedValue(undefined);
    tx.trip.update.mockResolvedValue({ id: 1, name: "Tatry" });

    const result = await service.updateAs({ sub: 10, role: "USER" } as any, 1, {
      name: "Tatry",
    } as any);
    expect(accessMock.assertCoordinatorOrAdmin).toHaveBeenCalledWith(
      { sub: 10, role: "USER" },
      1,
      { tx },
    );
    expect(tx.trip.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "Tatry" },
    });
    expect(result).toEqual({ id: 1, name: "Tatry" });
  });
});
