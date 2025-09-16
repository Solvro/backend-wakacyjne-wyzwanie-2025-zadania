import { ExpenseType, PrismaClient } from "@prisma/client";
import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { cleanDb } from "../test/utils/clean-db";
import { seedDb } from "../test/utils/seed-db";

const prisma = new PrismaClient();

describe("ExpenseController (e2e)", () => {
  let app: INestApplication;
  let tripId: number;
  let seededExpenseId: number;

  beforeEach(async () => {
    await cleanDb();
    await seedDb();

    const trip = await prisma.trip.findFirst();
    tripId = trip!.trip_id;

    const expense = await prisma.expense.findFirst();
    seededExpenseId = expense!.expense_id;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/expense (GET) → should return a list of expenses", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          expense_type: "FOOD",
          description: "Obiad w restauracji",
        }),
      ]),
    );
  });

  it("/expense/:id (GET) → should return a single expense", async () => {
    const response = await request(app.getHttpServer())
      .get(`/expense/${seededExpenseId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        expense_type: "FOOD",
        description: "Obiad w restauracji",
      }),
    );
  });

  it("/expense (POST) → should create a new expense", async () => {
    const expenseData = {
      trip_id: tripId,
      expense_type: ExpenseType.TRANSPORT,
      expense_date: new Date().toISOString(),
      cost: 150.75,
      description: "Taxi ride",
    };

    const response = await request(app.getHttpServer())
      .post("/expense")
      .send(expenseData)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        expense_id: expect.any(Number),
        expense_type: "TRANSPORT",
        cost: "150.75",
        description: "Taxi ride",
      }),
    );
  });

  it("/expense/:id (PATCH) → should update an expense", async () => {
    const updateData = {
      expense_type: ExpenseType.ACCOMMODATION,
      description: "Updated hotel stay",
    };

    const response = await request(app.getHttpServer())
      .patch(`/expense/${seededExpenseId}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        expense_type: "ACCOMMODATION",
        description: "Updated hotel stay",
        cost: expect.any(String),
      }),
    );
  });

  it("/expense/:id (DELETE) → should delete an expense", async () => {
    await request(app.getHttpServer())
      .delete(`/expense/${seededExpenseId}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/expense/${seededExpenseId}`)
      .expect(404);
  });
});
