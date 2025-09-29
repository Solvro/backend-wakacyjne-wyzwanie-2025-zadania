import { Gender, PrismaClient, Role } from "@prisma/client";
import type { Test } from "supertest";
import request from "supertest";
import type TestAgent from "supertest/lib/agent";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test as NestTest } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

interface ExpenseResponse {
  id: number;
  desc: string;
  price: number;
  trip_id: number;
}

describe("ExpenseController (e2e)", () => {
  let app: INestApplication;
  let createdId: number;
  let prisma: PrismaClient;
  let httpRequest: TestAgent<Test>;

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
      where: { destination: { contains: "Test" } },
    });
    await prisma.user.deleteMany({
      where: { email: { in: ["expense.user@example.com"] } },
    });

    const user = await prisma.user.create({
      data: {
        email: "expense.user@example.com",
        password: "hashedpassword012345",
        role: Role.USER,
        is_enabled: true,
        name: "Expense User",
      },
    });

    const participant = await prisma.participant.create({
      data: {
        email: user.email,
        first_name: "Expense",
        last_name: "Participant",
        gender: Gender.MALE,
      },
    });

    participant = participant.id;

    const trip = await prisma.trip.create({
      data: {
        destination: "Test Destination",
        date_start: new Date(),
        participant_id: 1,
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

  it("POST /expense → should create an expense", async () => {
    const result = await httpRequest
      .post("/expense")
      .send({
        desc: "Test Expense - Hotel",
        price: 99.9,
        trip_id: tripId,
      })
      .expect(201);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: expect.any(Number),
      desc: "Test Expense - Hotel",
      price: 99.9,
      trip_id: tripId,
    });

    createdId = body.id;
  });

  it("GET /expense → should return list with created expense", async () => {
    const result = await httpRequest.get("/expense").expect(200);

    const body: ExpenseResponse[] = result.body;

    expect(body.length).toBeGreaterThan(0);
    expect(body.some((response) => response.id === createdId)).toBeTruthy();
  });

  it("GET /expense/:id → should return single expense", async () => {
    const result = await httpRequest
      .get(`/expense/${String(createdId)}`)
      .expect(200);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      desc: "Test Expense - Hotel",
      price: 99.9,
      trip_id: tripId,
    });
  });

  it("PATCH /expense/:id → should update expense", async () => {
    const result = await httpRequest
      .patch(`/expense/${String(createdId)}`)
      .send({
        desc: "Test Expense - Updated",
        price: 1000,
      })
      .expect(200);

    const body: ExpenseResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      desc: "Test Expense - Updated",
      price: 1000,
      trip_id: tripId,
    });
  });

  it("DELETE /expense/:id → should delete expense", async () => {
    await httpRequest
      .delete(`/expense/${String(createdId)}`)
      .expect(200);

    await httpRequest.get(`/expense/${String(createdId)}`).expect(404);
  });
});
