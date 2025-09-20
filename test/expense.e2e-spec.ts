/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */
import { AuthRole, PrismaClient, Role } from "@prisma/client";
import type { SuperTest, Test } from "supertest";
import request from "supertest";
import TestAgent from "supertest/lib/agent";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test as NestTest } from "@nestjs/testing";

import { AppModule } from "../src/app/app.module";

interface ExpenseResponse {
  id: number;
  description: string;
  amount: number;
  currency: string;
  date: string;
  participant_id: number;
  trip_id: number;
}

describe("ExpenseController (e2e)", () => {
  let app: INestApplication;
  let createdId: number;
  let prisma: PrismaClient;
  let httpRequest: TestAgent<Test>;

  let participantId: number;
  let tripId: number;

  beforeAll(async () => {
    const moduleFixture = await NestTest.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );
    await app.init();

    prisma = new PrismaClient();
    httpRequest = request(app.getHttpServer());

    await prisma.expense.deleteMany();
    await prisma.participant.deleteMany({
      where: { email: { in: ["expense.user@example.com"] } },
    });
    await prisma.trip.deleteMany({
      where: { name: { contains: "Test Trip" } },
    });
    await prisma.user.deleteMany({
      where: { email: { in: ["expense.user@example.com"] } },
    });

    const user = await prisma.user.create({
      data: {
        email: "expense.user@example.com",
        password: "hashedPassword123",
        role: AuthRole.USER,
        isEnabled: true,
        name: "Expense User",
      },
    });

    const participant = await prisma.participant.create({
      data: {
        email: user.email,
        name: "Expense Participant",
        role: Role.PARTICIPANT,
      },
    });

    participantId = participant.id;

    const trip = await prisma.trip.create({
      data: {
        name: "Test Trip #expense",
        destination: "Test Destination",
        start_date: new Date(),
        end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    tripId = trip.id;
  });

  afterAll(async () => {
    await prisma.expense.deleteMany({
      where: { participant_id: participantId },
    });
    await prisma.participant.deleteMany({
      where: { email: { in: ["expense.user@example.com"] } },
    });
    await prisma.trip.deleteMany({
      where: { id: tripId },
    });
    await prisma.user.deleteMany({
      where: { email: { in: ["expense.user@example.com"] } },
    });

    await prisma.$disconnect();
    await app.close();
  });

  it("POST /api/v1/expenses → should create an expense", async () => {
    const result = await httpRequest
      .post("/api/v1/expenses")
      .send({
        description: "Test Expense - Hotel",
        amount: 200.5,
        currency: "USD",
        date: new Date().toISOString(),
        participant_id: participantId,
        trip_id: tripId,
      })
      .expect(201);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: expect.any(Number),
      description: "Test Expense - Hotel",
      amount: 200.5,
      currency: "USD",
      participant_id: participantId,
      trip_id: tripId,
    });

    createdId = body.id;
  });

  it("GET /api/v1/expenses → should return list with created expense", async () => {
    const result = await httpRequest.get("/api/v1/expenses").expect(200);

    const body: ExpenseResponse[] = result.body;

    expect(body.length).toBeGreaterThan(0);
    expect(body.some((e) => e.id === createdId)).toBeTruthy();
  });

  it("GET /api/v1/expenses/:id → should return single expense", async () => {
    const result = await httpRequest
      .get(`/api/v1/expenses/${String(createdId)}`)
      .expect(200);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      description: "Test Expense - Hotel",
      amount: 200.5,
      currency: "USD",
      participant_id: participantId,
      trip_id: tripId,
    });
  });

  it("PATCH /api/v1/expenses/:id → should update expense", async () => {
    const result = await httpRequest
      .patch(`/api/v1/expenses/${String(createdId)}`)
      .send({
        description: "Test Expense - Updated Hotel",
        amount: 300,
        currency: "EUR",
      })
      .expect(200);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      description: "Test Expense - Updated Hotel",
      amount: 300,
      currency: "EUR",
      participant_id: participantId,
      trip_id: tripId,
    });
  });

  it("DELETE /api/v1/expenses/:id → should delete expense", async () => {
    await httpRequest
      .delete(`/api/v1/expenses/${String(createdId)}`)
      .expect(200);

    await httpRequest.get(`/api/v1/expenses/${String(createdId)}`).expect(404);
  });
});
