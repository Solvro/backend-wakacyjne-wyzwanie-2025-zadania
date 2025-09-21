import type { Server } from "node:http";
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";

import { app, prisma } from "./setup";
import { truncateAll } from "./utils/database-helper-trunc";
import { createTestUserWithToken } from "./utils/test-helper";

describe("Participants (e2e)", () => {
  let tripId: number;

  beforeAll(() => {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );
  });

  beforeEach(async () => {
    await truncateAll();

    const trip = await prisma.trip.create({
      data: {
        name: "Participants Trip",
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    tripId = trip.id;
  });

  it("/GET /participants should return 200 and an array", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const response = await request(server).get("/participants").expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("POST /participants should create when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const { token } = await createTestUserWithToken("john.doe@example.com");

    const response = await request(server)
      .post("/participants")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        role: "MEMBER",
        tripId,
      })
      .expect(201);

    expect(response.body).toMatchObject({
      name: "John",
      lastname: "Doe",
      tripId,
    });
  });

  it("POST /participants should return 404 if trip does not exist", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const { token } = await createTestUserWithToken("missingtrip@example.com");

    await request(server)
      .post("/participants")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Very",
        lastname: "Tripless",
        email: "missingtrip@example.com",
        role: "MEMBER",
        tripId: 999_999,
      })
      .expect(404);
  });

  it("PATCH /participants/:id should update when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;

    const { token } = await createTestUserWithToken("update@example.com");

    const participant = await prisma.participant.create({
      data: {
        name: "ToUpdate",
        lastname: "Before",
        email: "update@example.com",
        tripId,
      },
    });

    const response = await request(server)
      .patch(`/participants/${participant.id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "UpdatedName", lastname: "After" })
      .expect(200);

    const updated = response.body as {
      id: number;
      name: string;
      lastname: string;
    };
    expect(updated.name).toBe("UpdatedName");
    expect(updated.lastname).toBe("After");
  });

  it("PATCH /participants/:id should return 404 if participant does not exist", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const { token } = await createTestUserWithToken("ghost@example.com");

    await request(server)
      .patch(`/participants/99999`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Nobody" })
      .expect(404);
  });

  it("PATCH /participants/:id should return 404 if new tripId does not exist", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const { token } = await createTestUserWithToken(
      "anothertripless@example.com",
    );

    const participant = await prisma.participant.create({
      data: {
        name: "Much",
        lastname: "TriplessToBe",
        email: "anothertripless@example.com",
        tripId,
      },
    });

    await request(server)
      .patch(`/participants/${participant.id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ tripId: 999_999 })
      .expect(404);
  });

  it("DELETE /participants/:id should delete when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;

    const { token } = await createTestUserWithToken("delete@example.com");

    const participant = await prisma.participant.create({
      data: {
        name: "ToDelete",
        lastname: "Me",
        email: "delete@example.com",
        tripId,
      },
    });

    const response = await request(server)
      .delete(`/participants/${participant.id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({ deleted: true });
  });

  it("DELETE /participants/:id should return 404 if participant does not exist", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const { token } = await createTestUserWithToken(
      "deletemissing@example.com",
    );

    await request(server)
      .delete("/participants/999999")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});
