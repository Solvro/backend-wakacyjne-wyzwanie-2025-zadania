import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { LoginResponseDto } from "../src/auth/dto/login-response.dto.js";
import { ExpenseModule } from "../src/expense/expense.module";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ExpenseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await cleanDatabase();
    await seedDatabase();

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "admin@example.com",
        password: "password",
      });

    const body = loginResponse.body as LoginResponseDto;
    token = body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/expense (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200)
      .set("Authorization", "Bearer ".concat(token));

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Conference Hotel",
          description: "Accommodation for business summit",
          value: 1250.75,
          trip_id: "1",
        }),
      ]),
    );
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("/expense/:id (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/expense/1");
    expect(response.status).toBe(200);
  });

  it("/expense (POST)", async () => {
    const dto = {
      name: "Piwo",
      description: "testing",
      value: 600.75,
      trip_id: "1",
    };
    const response = await request(app.getHttpServer())
      .post("/expense")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("destination", "Sicily");
  });

  it("/expense/:id (DELETE)", async () => {
    await request(app.getHttpServer())
      .delete("/expense/1")
      .set("Authorization", "Bearer ".concat(token))
      .expect(204);

    const response = await request(app.getHttpServer()).get("/expense/1");
    expect(response.status).toBe(404);
  });

  it("/expense/:id (PATCH)", async () => {
    const dto = { value: 1000.5 };
    await request(app.getHttpServer())
      .patch("/expense/1")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto)
      .expect(200);

    const response = await request(app.getHttpServer()).get("/expense/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("value", 1000.5);
  });
});
