import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

describe("TripsController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let createdTripId: number;

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

    const loginResponse = await request(app.getHttpServer() as App)
      .post("/auth/login")
      .send({ email: adminUser.email, password: adminUser.password });
    adminToken = (loginResponse.body as { token: string }).token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/trips (GET) should be public", async () => {
    const response = await request(app.getHttpServer() as App).get("/trips");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("/trips (POST) should require auth", async () => {
    const response = await request(app.getHttpServer() as App)
      .post("/trips")
      .send({
        destination: "Test City",
        description: "Test Desc",
        start: "2025-05-01",
        end: "2025-05-10",
      });
    expect(response.status).toBe(401);
  });

  it("/trips (POST) should create trip (ADMIN)", async () => {
    const uniqueDestination = `Test City ${Date.now().toString()}`;
    const isoStart = new Date("2025-05-01").toISOString();
    const isoEnd = new Date("2025-05-10").toISOString();
    const response = await request(app.getHttpServer() as App)
      .post("/trips")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ destination: uniqueDestination, start: isoStart, end: isoEnd });
    if (response.status !== 201) {
      console.error("POST /trips error:", response.body);
    }
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdTripId = (response.body as { id: number }).id;
  });

  it("/trips/:id (GET) should be public", async () => {
    const response = await request(app.getHttpServer() as App).get(
      `/trips/${String(createdTripId)}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdTripId);
  });

  it("/trips/:id (PATCH) should be public", async () => {
    const isoStart = new Date("2025-05-01").toISOString();
    const isoEnd = new Date("2025-05-10").toISOString();
    const response = await request(app.getHttpServer() as App)
      .patch(`/trips/${String(createdTripId)}`)
      .send({ description: "Updated Desc", start: isoStart, end: isoEnd });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdTripId);
  });

  it("/trips/:id (DELETE) should require auth", async () => {
    const response = await request(app.getHttpServer() as App).delete(
      `/trips/${String(createdTripId)}`,
    );
    expect(response.status).toBe(401);
  });

  it("/trips/:id (DELETE) as ADMIN", async () => {
    const response = await request(app.getHttpServer() as App)
      .delete(`/trips/${String(createdTripId)}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });
});
