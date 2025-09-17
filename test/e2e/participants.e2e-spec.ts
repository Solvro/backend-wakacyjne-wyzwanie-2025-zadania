import { PrismaClient } from "@prisma/client";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";

import {
  buildParticipantsApp,
  resetDb as resetDatabase,
} from "../utils/test-app.factory";

describe("Participants (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    app = await buildParticipantsApp();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it("POST /participants -> 201", async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Tatry",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });

    const res = await request(app.getHttpServer())
      .post("/participants")
      .send({ tripId: trip.id, name: "Jan", role: "MEMBER", share: "100.00" })
      .expect(201);

    expect(res.body.name).toBe("Jan");
    expect(res.body.tripId).toBe(trip.id);
  });

  it("GET /participants -> 200 (lista)", async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Karkonosze",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });
    await prisma.participant.create({
      data: {
        tripId: trip.id,
        name: "Genowefa",
        role: "MEMBER",
        share: "50.00",
      },
    });

    const res = await request(app.getHttpServer())
      .get("/participants")
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /participants/:id -> 200", async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Beskidy",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });
    const p = await prisma.participant.create({
      data: { tripId: trip.id, name: "Ola", role: "MEMBER", share: "10.00" },
    });

    const res = await request(app.getHttpServer())
      .get(`/participants/${p.id}`)
      .expect(200);
    expect(res.body.id).toBe(p.id);
  });

  it("PATCH /participants/:id -> 200", async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Sudety",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });
    const p = await prisma.participant.create({
      data: { tripId: trip.id, name: "Ola", role: "MEMBER", share: "10.00" },
    });

    const res = await request(app.getHttpServer())
      .patch(`/participants/${p.id}`)
      .send({ name: "Andrzej" });

    expect(res.body.name).toBe("Andrzej");
  });

  it("DELETE /participants/:id -> 204", async () => {
    const trip = await prisma.trip.create({
      data: {
        name: "Jura",
        startDate: new Date().toISOString(),
        status: "PLANNED",
      },
    });
    const p = await prisma.participant.create({
      data: { tripId: trip.id, name: "Jan", role: "MEMBER", share: "99.00" },
    });

    await request(app.getHttpServer())
      .delete(`/participants/${p.id}`)
      .expect(204);
    const exists = await prisma.participant.findUnique({ where: { id: p.id } });
    expect(exists).toBeNull();
  });
});
