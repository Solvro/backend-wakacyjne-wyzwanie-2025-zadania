/* eslint-disable unicorn/prefer-spread */
export const Role = {
  ADMIN: 0,
  MODERATOR: 1,
  USER: 2,
  GUEST: 3,
  TRIP_COORDINATOR: 4,
};

export interface Roles {
  ADMIN: number;
  MODERATOR: number;
  USER: number;
  GUEST: number;
}

export interface RolePermissions {
  role: number;
  name: string;
  description: string;
  permissions: string[];
}

export type RoleString = string;

export const ROLES_NUMBER = Object.keys(Role).length;

const ROLE_DEFINITIONS: Record<number, RolePermissions> = {
  [Role.ADMIN]: {
    role: Role.ADMIN,
    name: "Administrator",
    description: "Full system access",
    permissions: ["*"], // Wildcard for all permissions
  },
  [Role.MODERATOR]: {
    role: Role.MODERATOR,
    name: "Moderator",
    description: "Trip and user management access",
    permissions: [
      "trips:read",
      "trips:update",
      "users:read",
      "users:update",
      "participants:read",
      "participants:update",
      "expenses:read",
      "expenses:update",
    ],
  },
  [Role.USER]: {
    role: Role.USER,
    name: "User",
    description: "Standard user access",
    permissions: [
      "trips:read",
      "expenses:create",
      "expenses:read",
      "expenses:update",
      "participants:read",
      "users:read",
    ],
  },
  [Role.GUEST]: {
    role: Role.GUEST,
    name: "Guest",
    description: "Read-only access",
    permissions: ["trips:read", "expenses:read", "participants:read"],
  },
  [Role.TRIP_COORDINATOR]: {
    role: Role.TRIP_COORDINATOR,
    name: "Trip Coordinator",
    description: "Manage trips and participants",
    permissions: [
      "trips:create",
      "trips:read",
      "trips:update",
      "trips:delete",
      "participants:create",
      "participants:read",
      "participants:update",
      "expenses:read",
    ],
  },
};

export function hasRole(roleString: RoleString, role: number): boolean {
  return roleString[role] === "1";
}

export function setRole(roleString: RoleString, role: number): RoleString {
  const roles = roleString.split("");
  roles[role] = "1";
  return roles.join("");
}

export function removeRole(roleString: RoleString, role: number): RoleString {
  const roles = roleString.split("");
  roles[role] = "0";
  return roles.join("");
}

export function toggleRole(roleString: RoleString, role: number): RoleString {
  return hasRole(roleString, role)
    ? removeRole(roleString, role)
    : setRole(roleString, role);
}

export function getUserRoles(roleString: RoleString): number[] {
  return Object.values(Role).filter(
    (role): role is number =>
      typeof role === "number" && hasRole(roleString, role),
  );
}

export function hasPermission(
  roleString: RoleString,
  permission: string,
): boolean {
  const userRoles = getUserRoles(roleString);

  return userRoles.some((role): boolean => {
    const rolePerms = ROLE_DEFINITIONS[role].permissions;
    return rolePerms.includes("*") || rolePerms.includes(permission);
  });
}
