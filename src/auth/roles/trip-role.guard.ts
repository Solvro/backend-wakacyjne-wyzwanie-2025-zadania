import { TripRole } from "@prisma/client";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { TRIP_ROLES_KEY } from "./trip-role.decorator";

interface RequestParticipant { email: string; role: TripRole }

@Injectable()
export class TripRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required =
      this.reflector.getAllAndOverride<TripRole[]>(TRIP_ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);


    if (required.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: RequestParticipant }>();
    const participant = request.user;

    if (participant === undefined) {
    throw new ForbiddenException("Missing participant");
    }

    if (!required.includes(participant.role)) {
      throw new ForbiddenException("Missing privileges for this trip");
    }

    return true;
  }
}

