import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

describe("ParticipantsController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let createdParticipantId: number;

  const adminUser = {
    email: "janko@gmail.com",
    password: "haslo_janko@gmail.com",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
    );
    await app.init();

    const loginResult = await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({ email: adminUser.email, password: adminUser.password });
    adminToken = (loginResult.body as { token: string }).token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/participants (GET) should require auth", async () => {
    const result = await request(app.getHttpServer() as App).get(
      "/participants",
    );
    expect(result.status).toBe(401);
  });

  it("/participants (POST) should create participant (ADMIN)", async () => {
    const result = await request(app.getHttpServer() as App)
      .post("/participants")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ trip_id: 1, user_email: "anka_n@gmail.com" });
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    createdParticipantId = (result.body as { id: number }).id;
  });

  it("/participants (GET) as ADMIN", async () => {
    const result = await request(app.getHttpServer() as App)
      .get("/participants")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it("/participants/:id (GET) as ADMIN", async () => {
    const result = await request(app.getHttpServer() as App)
      .get(`/participants/${String(createdParticipantId)}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", createdParticipantId);
  });

  it("/participants/:id (PATCH) as ADMIN", async () => {
    const result = await request(app.getHttpServer() as App)
      .patch(`/participants/${String(createdParticipantId)}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ trip_id: 1 });
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", createdParticipantId);
  });

  it("/participants/:id (DELETE) as ADMIN", async () => {
    const result = await request(app.getHttpServer() as App)
      .delete(`/participants/${String(createdParticipantId)}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(result.status).toBe(200);
  });
});
