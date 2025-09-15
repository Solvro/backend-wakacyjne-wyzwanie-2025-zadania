import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";

import type { DatabaseService } from "../src/database/database.service";

export async function loginAdmin(
  prisma: DatabaseService,
  app: INestApplication<App>,
) {
  const adminUser = {
    email: "admin134@example.com",
    password: "admin123dsad",
    role: Role.ADMIN,
    isEnabled: true,
    name: "Admin",
    aboutMe: "None",
  };

  interface LoginResponse {
    token: string;
  }
  const salt = 10;
  const hashedPassword = await hash(adminUser.password, salt);

  const admin = await prisma.user.findUnique({
    where: { email: adminUser.email },
  });
  if (admin === null) {
    await prisma.user.create({
      data: { ...adminUser, password: hashedPassword },
    });
  }
  const response = await request(app.getHttpServer()).post("/auth/login").send({
    email: adminUser.email,
    password: adminUser.password,
  });

  const body = response.body as LoginResponse;
  const adminToken = body.token;

  return adminToken;
}
