import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import type { JwtPayload } from "../auth/jwt.strategy";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripAccessService } from "./trip-access.service";

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: TripAccessService,
  ) {}

  async updateAs(
    user: Pick<JwtPayload, "sub" | "role">,
    tripId: number,
    dto: UpdateTripDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      await this.access.assertCoordinatorOrAdmin(user, tripId, { tx });
      return tx.trip.update({ where: { id: tripId }, data: dto });
    });
  }
}
