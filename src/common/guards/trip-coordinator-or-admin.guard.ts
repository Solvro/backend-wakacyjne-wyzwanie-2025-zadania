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

type StringNumber = string | number;
type ParameterBag = Record<string, StringNumber | undefined>;

function parseTripId(
  parameters: ParameterBag,
  body: ParameterBag,
): number | null {
  const candidate = parameters.tripId ?? parameters.id ?? body.tripId;

  if (typeof candidate === "number") {
    return Number.isInteger(candidate) && candidate > 0 ? candidate : null;
  }
  if (typeof candidate === "string") {
    // nie umiem regexów 😭 ale idk czy da się inaczej
    return /^[1-9]\d*$/.test(candidate) ? Number(candidate) : null;
  }
  return null;
}

@Injectable()
export class TripCoordinatorOrAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

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

    const tripId = parseTripId(
      request.params as ParameterBag,
      request.body as ParameterBag,
    );

    if (tripId === null) {
      throw new NotFoundException("Brakuje lub błędne tripId");
    }

    const membership = await this.prisma.participant.findFirst({
      where: {
        tripId,
        userId: user.sub,
        role: { in: ["COORDINATOR", "ORGANIZER"] },
      },
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
