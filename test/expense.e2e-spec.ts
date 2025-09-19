/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/restrict-template-expressions */
import { expense_category, trip_type } from "@prisma/client";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { RoleGuard } from "../src/auth/roles/role.guard";
import { clear } from "./utils/clear";
import prisma from "./utils/prisma";

describe("ExpensesController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /expense - tworzy wydatek", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Kraków",
        type: trip_type.city_break,
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .post("/expense")
      .send({
        trip_id: trip.id,
        amount: 500,
        category: expense_category.food,
      })
      .expect(201);

    expect(response.body.amount).toBe(500);
  });

  it("GET /expense - zwraca listę wydatków", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Warszawa",
        type: trip_type.business,
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    await prisma.expense.create({
      data: {
        trip_id: trip.id,
        amount: 200,
        category: expense_category.food,
      },
    });

    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200);
    expect(response.body.length).toBe(1);
  });
  it("GET /expense/:id - zwraca wydatek po ID", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Gdańsk",
        type: trip_type.city_break,
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const expense = await prisma.expense.create({
      data: {
        trip_id: trip.id,
        amount: 300,
        category: expense_category.transport,
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/expense/${expense.id}`)
      .expect(200);

    expect(response.body.id).toBe(expense.id);
    expect(response.body.amount).toBe(300);
    expect(response.body.category).toBe("transport");
  });
  it("PATCH /expense/:id - aktualizuje wydatek", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Wrocław",
        type: trip_type.city_break,
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const expense = await prisma.expense.create({
      data: {
        trip_id: trip.id,
        amount: 150,
        category: expense_category.food,
      },
    });

    const response = await request(app.getHttpServer())
      .patch(`/expense/${expense.id}`)
      .send({
        amount: 200,
        category: expense_category.other,
      })
      .expect(200);

    expect(response.body.amount).toBe(200);
    expect(response.body.category).toBe(expense_category.other);
    expect(response.body.id).toBe(expense.id);
  });
  it("DELETE /expense/:id - usuwa wydatek", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Zakopane",
        type: trip_type.leisure,
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const expense = await prisma.expense.create({
      data: {
        trip_id: trip.id,
        amount: 400,
        category: expense_category.accommodation,
      },
    });

    await request(app.getHttpServer())
      .delete(`/expense/${expense.id}`)
      .expect(200);

    const deletedExpense = await prisma.expense.findUnique({
      where: { id: expense.id },
    });
    expect(deletedExpense).toBeNull();
  });
});
