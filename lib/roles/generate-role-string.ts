export function generateRoleString(numberOfRoles = 4): string {
  return "0".repeat(numberOfRoles);
}

export function generateDefaultUserRoles(): string {
  const roleString = generateRoleString();
  // Set USER role (index 2) to '1'
  const roles = roleString.split("");
  roles[2] = "1"; // Role.USER = 2
  return roles.join("");
}
