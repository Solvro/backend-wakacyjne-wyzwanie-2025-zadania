import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { LoginResponseDto } from "../src/auth/dto/login-response.dto.js";
import { ParticipantModule } from "../src/participant/participant.module";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ParticipantModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await cleanDatabase();
    await seedDatabase();

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "superuser@example.com",
        password: "password",
      });

    const body = loginResponse.body as LoginResponseDto;
    token = body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/participant (GET) ", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200)
      .set("Authorization", "Bearer ".concat(token));
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("/participant/:id (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/participant/3");
    expect(response.status).toBe(200);
  });

  it("/participant (POST)", async () => {
    const dto = { name: "Eve Smith", email: "admin@example.com", trip_id: 1 };
    const response = await request(app.getHttpServer())
      .post("/participant")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", "admin@example.com");
  });

  it("/participant/:id (DELETE)", async () => {
    await request(app.getHttpServer())
      .delete("/participant/1")
      .set("Authorization", "Bearer ".concat(token))
      .expect(204);

    const response = await request(app.getHttpServer()).get("/participant/1");
    expect(response.status).toBe(404);
  });

  it("/participant/:id (PATCH)", async () => {
    const dto = { name: "Jane whoknows" };
    await request(app.getHttpServer())
      .patch("/participant/3")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto)
      .expect(200);

    const response = await request(app.getHttpServer()).get("/participant/3");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Jane whoknows");
  });
});
