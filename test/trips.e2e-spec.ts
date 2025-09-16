import { Role } from "@prisma/client";
import type { Server } from "node:http";
import type { Response } from "supertest";
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";

import { app, prisma } from "./setup";
import {
  registerAndLogin,
  registerAndLoginAsRole,
} from "./utils/register-login";

describe("Trips (e2e)", () => {
  beforeAll(() => {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );
  });

  afterAll(async () => {
    await prisma.trip.deleteMany({});
  });

  it("/GET /trips should return 200 and an array", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const response: Response = await request(server).get("/trips").expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("POST /trips should be forbidden for regular USER (RolesGuard)", async () => {
    const token = await registerAndLogin("user_trips@ex.com", "password123");
    const server = app.getHttpServer() as unknown as Server;

    await request(server)
      .post("/trips")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "ForbiddenTrip",
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
      .expect(403);
  });

  it("POST /trips should validate future date (IsFutureDate) -> 400 with past date", async () => {
    const token = await registerAndLoginAsRole(
      "coord_validate@ex.com",
      "password123",
      Role.COORDINATOR,
    );
    const server = app.getHttpServer() as unknown as Server;

    await request(server)
      .post("/trips")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TripWithPastDate",
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      })
      .expect(400);
  });

  it("POST /trips should allow COORDINATOR to create and PATCH should update", async () => {
    const token = await registerAndLoginAsRole(
      "coord_create@ex.com",
      "password123",
      Role.COORDINATOR,
    );
    const server = app.getHttpServer() as unknown as Server;

    const createResponse: Response = await request(server)
      .post("/trips")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Vacation 2026",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .expect(201);

    const createdTrip = createResponse.body as { id: number; name: string };
    const tripId: number = createdTrip.id;

    const patchResponse: Response = await request(server)
      .patch(`/trips/${tripId.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Vacation Updated" })
      .expect(200);

    const patchedTrip = patchResponse.body as { id: number; name: string };
    expect(patchedTrip.name).toBe("Vacation Updated");
  });
});
