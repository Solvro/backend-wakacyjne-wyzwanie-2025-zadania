import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

describe("ExpensesController (e2e)", () => {
  let app: INestApplication;
  let adminToken: string;
  let createdExpenseId: number;

  const adminUser = {
    email: "janko@gmail.com",
    password: "haslo_janko@gmail.com",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
    );
    await app.init();

    const loginResult: request.Response = await request(
      app.getHttpServer() as App,
    )
      .post("/auth/login")
      .send({ email: adminUser.email, password: adminUser.password });
    adminToken = (loginResult.body as { token: string }).token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/expenses (GET) should require auth", async () => {
    const response = await request(app.getHttpServer() as App).get("/expenses");
    expect(response.status).toBe(401);
  });

  it("/expenses (POST) should create expense (ADMIN)", async () => {
    const response = await request(app.getHttpServer() as App)
      .post("/expenses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        what: "Test Expense",
        amount: 100,
        trip_id: 1,
        user_email: "janko@gmail.com",
      });
    if (response.status !== 201) {
      console.error("POST /expenses error:", response.body);
    }
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdExpenseId = (response.body as { id: number }).id;
  });

  it("/expenses (GET) as ADMIN", async () => {
    const response = await request(app.getHttpServer() as App)
      .get("/expenses")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("/expenses/:id (GET) as ADMIN", async () => {
    const response = await request(app.getHttpServer() as App)
      .get(`/expenses/${String(createdExpenseId)}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdExpenseId);
  });

  it("/expenses/:id (PATCH) as ADMIN", async () => {
    const response = await request(app.getHttpServer() as App)
      .patch(`/expenses/${String(createdExpenseId)}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 150 });
    if (response.status !== 200) {
      console.error("PATCH /expenses error:", response.body);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdExpenseId);
  });

  it("/expenses/:id (DELETE) as ADMIN", async () => {
    const response = await request(app.getHttpServer() as App)
      .delete(`/expenses/${String(createdExpenseId)}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });
});
