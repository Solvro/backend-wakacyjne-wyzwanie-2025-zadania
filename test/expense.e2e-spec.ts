import { ExpenseType, PrismaClient } from "@prisma/client";
import type { Server } from "node:http";
import request from "supertest";
import type { Response } from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { cleanDatabase } from "./utils/clean-database";
import { seedDatabase } from "./utils/seed-database";

const prisma = new PrismaClient();

describe("ExpenseController (e2e)", () => {
  let app: INestApplication;
  let server: Server;

  let tripId: number;
  let seededExpenseId: number;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const trip = await prisma.trip.findFirst();
    if (trip === null) {
      throw new Error("Seed error: no trip found");
    }
    tripId = trip.trip_id;

    const expense = await prisma.expense.findFirst();
    if (expense === null) {
      throw new Error("Seed error: no expense found");
    }
    seededExpenseId = expense.expense_id;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer() as unknown as Server;
  });

  it("/expense (GET) → should return a list of expenses", async () => {
    await request(server)
      .get("/expense")
      .expect(200)
      .expect((response: Response) => {
        const body = response.body as unknown as Record<string, unknown>[];
        expect(Array.isArray(body)).toBe(true);
        expect(body[0]).toEqual(
          expect.objectContaining({
            expense_type: "FOOD",
            description: "Obiad w restauracji",
          }),
        );
      });
  });

  it("/expense/:id (GET) → should return a single expense", async () => {
    await request(server)
      .get(`/expense/${String(seededExpenseId)}`)
      .expect(200)
      .expect((response: Response) => {
        const body = response.body as unknown as Record<string, unknown>;
        expect(body.expense_type).toBe("FOOD");
        expect(body.description).toBe("Obiad w restauracji");
      });
  });

  it("/expense (POST) → should create a new expense", async () => {
    const expenseData = {
      trip_id: tripId,
      expense_type: ExpenseType.TRANSPORT,
      expense_date: new Date().toISOString(),
      cost: 150.75,
      description: "Taxi ride",
    };

    await request(server)
      .post("/expense")
      .send(expenseData)
      .expect(201)
      .expect((response: Response) => {
        const body = response.body as unknown as Record<string, unknown>;
        expect(typeof body.expense_id).toBe("number");
        expect(body.expense_type).toBe("TRANSPORT");
        expect(body.cost).toBe("150.75");
        expect(body.description).toBe("Taxi ride");
      });
  });

  it("/expense/:id (PATCH) → should update an expense", async () => {
    const updateData = {
      expense_type: ExpenseType.ACCOMMODATION,
      description: "Updated hotel stay",
    };

    await request(server)
      .patch(`/expense/${String(seededExpenseId)}`)
      .send(updateData)
      .expect(200)
      .expect((response: Response) => {
        const body = response.body as unknown as Record<string, unknown>;
        expect(body.expense_type).toBe("ACCOMMODATION");
        expect(body.description).toBe("Updated hotel stay");
      });
  });

  it("/expense/:id (DELETE) → should delete an expense", async () => {
    await request(server)
      .delete(`/expense/${String(seededExpenseId)}`)
      .expect(204);

    await request(server)
      .get(`/expense/${String(seededExpenseId)}`)
      .expect(404);
  });
});
