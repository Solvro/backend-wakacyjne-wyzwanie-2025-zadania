import type { Trip } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type * as http from "node:http";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";

import { buildTripsApp, resetDatabase } from "../utils/test-app.factory";

describe("Trips (e2e)", () => {
  let app: INestApplication;
  const prisma = new PrismaClient();
  let server: http.Server;

  beforeAll(async () => {
    app = await buildTripsApp();
    server = app.getHttpServer() as http.Server;
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it("PATCH /trips/:id -> 200", async () => {
    const t = await prisma.trip.create({
      data: {
        name: "Tatry",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });

    const response = await request(server)
      .patch(`/trips/${String(t.id)}`)
      .send({ description: "Nie wiem nie jestem kreatywny", status: "ONGOING" })
      .expect(200);

    const body = response.body as Trip;
    expect(body.id).toBe(t.id);
    expect(body.description).toBe("Nie wiem nie jestem kreatywny");
    expect(body.status).toBe("ONGOING");
  });
});
