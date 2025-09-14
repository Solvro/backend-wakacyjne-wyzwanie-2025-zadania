import type { AuthRole } from "@prisma/client";

import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);
