import { SetMetadata } from "@nestjs/common";

export type AppRole = "USER" | "ADMIN";
export const ROLES_KEY = "roles";
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
