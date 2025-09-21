import { Role } from "@prisma/client";

import { AuthService } from "../../src/auth/auth.service";
import { UserService } from "../../src/user/user.service";
import { prisma } from "../setup";

const userService = new UserService(prisma);
const authService = new AuthService(userService);

export async function createTestUserWithToken(
  email: string,
  role: Role = Role.USER,
) {
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: "hashed_password",
      role,
    },
  });

  const token = authService.generateToken(email);

  return { user, token };
}
