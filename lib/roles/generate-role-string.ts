/* eslint-disable unicorn/prefer-spread */
import { Role } from "./role-utils";

export function generateRoleString(numberOfRoles = 4): string {
  return "0".repeat(numberOfRoles);
}

export function generateDefaultUserRoles(): string {
  const roleString = generateRoleString();
  const roles = roleString.split("");
  roles[Role.USER] = "1";
  return roles.join("");
}
