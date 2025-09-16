import { Role } from "@prisma/client";
import type { Server } from "node:http";
import request from "supertest";

import type { LoginResponseDto } from "../../src/auth/dto/login-response.dto";
import { app, prisma } from "../setup";

export async function registerAndLogin(
  email = "test@example.com",
  password = "password123",
) {
  const server = app.getHttpServer() as unknown as Server;

  await request(server)
    .post("/auth/register")
    .send({ email, password, name: "TestUser" })
    .expect(201);

  const response = await request(server)
    .post("/auth/login")
    .send({ email, password })
    .expect(200);

  const body = response.body as LoginResponseDto;
  return body.token;
}

export async function registerAndLoginAsRole(
  email = "role@example.com",
  password = "password123",
  role: Role = Role.COORDINATOR,
) {
  const server = app.getHttpServer() as unknown as Server;
  await request(server)
    .post("/auth/register")
    .send({ email, password, name: "RoleUser" })
    .expect(201);

  await prisma.user.update({
    where: { email },
    data: { role },
  });

  const response = await request(server)
    .post("/auth/login")
    .send({ email, password })
    .expect(200);

  const body = response.body as LoginResponseDto;
  return body.token;
}
