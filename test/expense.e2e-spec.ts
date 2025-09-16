import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { ExpenseModule } from "../src/expense/expense.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { validExpense } from "./test-utils";

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/expense (POST)", async () => {
    return request(app.getHttpServer())
      .post("/expense")
      .send(validExpense())
      .expect(201)
      .then((expense) => {
        expect(expense.body).toEqual({
          id: expect.any(Number) as unknown,
          name: "testExpense",
          date: expect.any(String) as unknown,
          value: "13.25",
          description: null,
          trip_participant_id: expect.any(Number) as unknown,
        });
      });
  });

  it("/expense (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Expense1",
          description: null,
          date: expect.any(String) as unknown,
          value: "11",
          trip_participant_id: expect.any(Number) as unknown,
        }),
        expect.objectContaining({
          name: "Expense2",
          description: null,
          date: expect.any(String) as unknown,
          value: "22",
          trip_participant_id: expect.any(Number) as unknown,
        }),
      ]),
    );
  });

  it("/expense/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense/1")
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      description: null,
      date: expect.any(String) as unknown,
      name: "Expense1",
      value: "11",
      trip_participant_id: 1,
    });
  });
  it("/expense/:id (PATCH)", async () => {
    const response = await request(app.getHttpServer())
      .patch("/expense/2")
      .send({
        description: "expense description",
      })
      .expect(200);

    expect(response.body).toEqual({
      id: 2,
      description: "expense description",
      date: expect.any(String) as unknown,
      name: "Expense2",
      trip_participant_id: 1,
      value: "22",
    });
  });

  it("/expense/:id (DELETE)", async () => {
    const response = await request(app.getHttpServer())
      .delete("/expense/2")
      .expect(200);

    expect(response.body).toEqual({
      id: 2,
      date: expect.any(String) as unknown,
      value: "22",
      description: null,
      name: "Expense2",
      trip_participant_id: 1,
    });
  });
});
