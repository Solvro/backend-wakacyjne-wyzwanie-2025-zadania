import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { LoginResponseDto } from "../src/auth/dto/login-response.dto.js";
import { TasksService } from "../src/currency/tasks/tasks.service";
import { TripModule } from "../src/trip/trip.module";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TripModule],
    })
      .overrideProvider(TasksService)
      .useValue({ handleCron: jest.fn() })
      .compile();

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

  it("/trip (GET) ", async () => {
    const response = await request(app.getHttpServer()).get("/trip");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.status).toBe(200);
  });

  it("/trip/:id (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/trip/1000"); // fail cause not that many trips exist
    expect(response.status).toBe(404);
  });

  it("/trip (POST)", async () => {
    const dto = {
      destination: "Sicily",
      description: "E2E Trip",
      start_date: new Date(),
      end_date: new Date(),
    };
    const response = await request(app.getHttpServer())
      .post("/trip")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("destination", "Sicily");
  });

  it("/trip/:id (DELETE)", async () => {
    await request(app.getHttpServer())
      .delete("/trip/1")
      .set("Authorization", "Bearer ".concat(token))
      .expect(204);

    const response = await request(app.getHttpServer()).get("/trip/1");
    expect(response.status).toBe(404);
  });

  it("/trip/:id (PATCH)", async () => {
    const dto = { description: "czy ktos powiedział piwo?" };
    await request(app.getHttpServer())
      .patch("/trip/2")
      .set("Authorization", "Bearer ".concat(token))
      .send(dto)
      .expect(200);

    const response = await request(app.getHttpServer()).get("/trip/2");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "description",
      "czy ktos powiedział piwo?",
    );
  });
});
