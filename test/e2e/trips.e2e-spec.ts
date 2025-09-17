import { PrismaClient } from "@prisma/client";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";

import {
  buildTripsApp,
  resetDb as resetDatabase,
} from "../utils/test-app.factory";

describe("Trips (e2e)", () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    app = await buildTripsApp();
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

    const res = await request(app.getHttpServer())
      .patch(`/trips/${t.id}`)
      .send({ description: "Nie wiem nie jestem kreatywny", status: "ONGOING" })
      .expect(200);

    expect(res.body.id).toBe(t.id);
    expect(res.body.description).toBe("Nie wiem nie jestem kreatywny");
    expect(res.body.status).toBe("ONGOING");
  });
});
