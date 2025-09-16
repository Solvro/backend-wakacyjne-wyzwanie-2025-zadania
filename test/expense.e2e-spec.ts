import type { Server } from "node:http";
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";

import { app, prisma } from "./setup";
import { registerAndLogin } from "./utils/register-login";

describe("Expenses (e2e)", () => {
  let tripId: number;
  let participantId: number;

  beforeAll(async () => {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );

    const trip = await prisma.trip.create({
      data: {
        name: "Expenses Trip",
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    tripId = trip.id;

    const participant = await prisma.participant.create({
      data: {
        name: "ExpenseUser",
        lastname: "Payer",
        email: "payer@example.com",
        tripId,
      },
    });
    participantId = participant.id;
  });

  afterAll(async () => {
    await prisma.expense.deleteMany({});
    await prisma.participant.deleteMany({});
    await prisma.trip.deleteMany({});
  });

  it("/GET /expenses should return 200 and an array", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const response = await request(server).get("/expenses").expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("POST /expenses should create when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const token = await registerAndLogin("expense_user@ex.com", "password123");

    const response = await request(server)
      .post("/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        participantId,
        amount: 42.5,
        category: "OTHER",
        note: "Lunch",
      })
      .expect(201);

    expect(response.body).toMatchObject({
      amount: 42.5,
      note: "Lunch",
      participantId,
    });
  });

  it("PATCH /expenses/:id should update when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const expense = await prisma.expense.create({
      data: {
        amount: 10,
        category: "FOOD",
        note: "Old note",
        participantId,
      },
    });

    const token = await registerAndLogin(
      "expense_update@ex.com",
      "password123",
    );

    const response = await request(server)
      .patch(`/expenses/${expense.id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 15, note: "Updated note" })
      .expect(200);

    const updated = response.body as {
      id: number;
      amount: number;
      note: string;
    };
    expect(updated.amount).toBe(15);
    expect(updated.note).toBe("Updated note");
  });

  it("DELETE /expenses/:id should delete when authenticated", async () => {
    const server = app.getHttpServer() as unknown as Server;
    const expense = await prisma.expense.create({
      data: {
        amount: 5,
        category: "OTHER",
        participantId,
      },
    });

    const token = await registerAndLogin(
      "expense_delete@ex.com",
      "password123",
    );

    const response = await request(server)
      .delete(`/expenses/${expense.id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({ deleted: true });
  });
});
