export * from "./generate-role-string";
export * from "./role-utils";

// Convenience exports
export {
  Role,
  hasRole,
  setRole,
  removeRole,
  hasPermission,
} from "./role-utils";
export {
  generateRoleString,
  generateDefaultUserRoles,
} from "./generate-role-string";
