import type { Participant } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type * as http from "node:http";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";

import { buildParticipantsApp, resetDatabase } from "../utils/test-app.factory";

describe("Participants (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let server: http.Server;

  beforeAll(async () => {
    prisma = new PrismaClient();
    app = await buildParticipantsApp();
    server = app.getHttpServer() as http.Server;
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

    const response = await request(server)
      .post("/participants")
      .send({ tripId: trip.id, name: "Jan", role: "MEMBER", share: "100.00" })
      .expect(201);
    const body = response.body as Participant;
    expect(body.name).toBe("Jan");
    expect(body.tripId).toBe(trip.id);
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

    const response = await request(server).get("/participants").expect(200);
    const body = response.body as Participant[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
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

    const response = await request(server)
      .get(`/participants/${String(p.id)}`)
      .expect(200);
    const body = response.body as Participant;
    expect(body.id).toBe(p.id);
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

    const response = await request(server)
      .patch(`/participants/${String(p.id)}`)
      .send({ name: "Andrzej" })
      .expect(200);
    const body = response.body as Participant;
    expect(body.name).toBe("Andrzej");
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

    await request(server)
      .delete(`/participants/${String(p.id)}`)
      .expect(204);
    const exists = await prisma.participant.findUnique({ where: { id: p.id } });
    expect(exists).toBeNull();
  });
});
