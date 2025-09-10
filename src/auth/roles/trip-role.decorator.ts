import type { TripRole } from "@prisma/client";

import { SetMetadata } from "@nestjs/common";


export const TRIP_ROLES_KEY = "trip-roles";
export const TripRoles = (...roles: TripRole[]) => SetMetadata(TRIP_ROLES_KEY, roles);