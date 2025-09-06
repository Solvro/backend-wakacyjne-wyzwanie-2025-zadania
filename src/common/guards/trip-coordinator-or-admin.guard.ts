import type { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../../prisma/prisma.service";
import type { JwtPayload } from "../../auth/jwt.strategy";

@Injectable()
export class TripCoordinatorOrAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    const user = request.user;
    if (user === undefined) {
      throw new ForbiddenException();
    }

    if (user.role === "ADMIN") {
      return true;
    }

    const parameters = request.params as Record<string, string | undefined>;
    const body = request.body as Record<string, unknown>;
    const raw =
      parameters.id ??
      parameters.tripId ??
      (body.tripId as string | number | undefined);
    const tripId = typeof raw === "string" ? Number(raw) : Number(raw);

    if (!Number.isInteger(tripId)) {
      throw new NotFoundException("brakuje tripID");
    }

    const membership = await this.prisma.participant.findFirst({
      where: { tripId, userId: user.sub, role: "COORDINATOR" },
      select: { id: true },
    });

    if (membership === null) {
      throw new ForbiddenException(
        "Tylko koordynator albo admin może zmodyfikować wycieczkę",
      );
    }
    return true;
  }
}
