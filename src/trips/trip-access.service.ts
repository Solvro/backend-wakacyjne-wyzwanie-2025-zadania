import { Prisma } from "@prisma/client";

import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import type { JwtPayload } from "../auth/jwt.strategy";

@Injectable()
export class TripAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertCoordinatorOrAdmin(
    user: Pick<JwtPayload, "sub" | "role">,
    tripId: number,
    options?: { tx?: Prisma.TransactionClient },
  ): Promise<void> {
    if (user.role === "ADMIN") {
      return;
    }

    const database = options?.tx ?? this.prisma;

    const membership = await database.participant.findFirst({
      where: {
        tripId,
        userId: user.sub,
        role: { in: ["COORDINATOR", "ORGANIZER"] },
      },
      select: { id: true },
    });

    if (membership === null) {
      throw new ForbiddenException(
        "Tylko koordynator albo admin może wykonać tę operację",
      );
    }
  }
}
