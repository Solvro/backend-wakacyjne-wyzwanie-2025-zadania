import { Category } from "@prisma/client";
//import { log } from "node:console";
import type { LoginResponseDto } from "src/auth/dto/login-response.dto";
import type { CreateExpenseDto } from "src/expense/dto/create-expense.dto";
import type { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthModule } from "../src/auth/auth.module";
import { ExpenseModule } from "../src/expense/expense.module";
import { seedDatabase } from "./seed-database";

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;
  let adminToken: string;
  let coordinatorToken: string;
  let userToken: string;

  beforeEach(async () => {
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const adminLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "admin123" });
    adminToken = adminLoginResponse.body.token;

    const coordinatorLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "coordinator@example.com", password: "coordinator123" });
    coordinatorToken = coordinatorLoginResponse.body.token;

    const userLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "user@example.com", password: "user123" });
    userToken = userLoginResponse.body.token;
  });

  describe("GET /expense", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).get("/expense").expect(401);
    });

    it("should return 200 and a list of all expenses with a valid token", () => {
      return request(app.getHttpServer())
        .get("/expense")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toBeInstanceOf(Array);
          expect(
            (response.body as ExpenseResponseDto[]).length,
          ).toBeGreaterThan(0);
        });
    });
  });

  describe("POST /expense", () => {
    const createDto: CreateExpenseDto = {
      description: "Test Expense",
      amount: 50,
      category: Category.FOOD,
      tripId: 1,
    };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .post("/expense")
        .send(createDto)
        .expect(401);
    });

    it("should return 403 Forbidden for a regular user", () => {
      return request(app.getHttpServer())
        .post("/expense")
        .set("Authorization", `Bearer ${userToken}`)
        .send(createDto)
        .expect(403);
    });

    it("should create a new expense for an ADMIN and return 201 Created", () => {
      return request(app.getHttpServer())
        .post("/expense")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(createDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("expense_id");
          expect((response.body as ExpenseResponseDto).description).toBe(
            createDto.description,
          );
        });
    });

    it("should create a new expense for a COORDINATOR and return 201 Created", () => {
      return request(app.getHttpServer())
        .post("/expense")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send(createDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("expense_id");
          expect((response.body as ExpenseResponseDto).description).toBe(
            createDto.description,
          );
        });
    });

    it("should return 404 Not Found if the tripId does not exist", () => {
      return request(app.getHttpServer())
        .post("/expense")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          amount: createDto.amount,
          description: createDto.description,
          category: createDto.category,
          tripId: 999,
        })
        .expect(404);
    });
  });

  describe("GET /expense/:id", () => {
    //log(adminToken);
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).get(`/expense/1`).expect(401);
    });

    it("should return 200 and the expense with a valid ID", () => {
      return request(app.getHttpServer())
        .get(`/expense/1`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .expect((response) => {
          //log(response.body);
          expect((response.body as ExpenseResponseDto).expense_id).toBe(1);
        });
    });

    it("should return 404 Not Found for an invalid ID", () => {
      return request(app.getHttpServer())
        .get("/expense/9999")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe("PATCH /expense/:id", () => {
    const updateDto = {
      description: "Updated Expense Name",
      amount: 100,
    };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .patch(`/expense/1`)
        .send(updateDto)
        .expect(401);
    });

    it("should return 403 Forbidden for a regular user", () => {
      return request(app.getHttpServer())
        .patch(`/expense/1`)
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateDto)
        .expect(403);
    });

    it("should update an expense for an ADMIN and return 200 OK", () => {
      return request(app.getHttpServer())
        .patch(`/expense/1`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(200)
        .expect((response) => {
          expect((response.body as ExpenseResponseDto).description).toBe(
            updateDto.description,
          );
          expect((response.body as ExpenseResponseDto).amount).toBe(
            updateDto.amount,
          );
        });
    });

    it("should update an expense for a COORDINATOR and return 200 OK", () => {
      return request(app.getHttpServer())
        .patch(`/expense/1`)
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send(updateDto)
        .expect(200)
        .expect((response) => {
          expect((response.body as ExpenseResponseDto).description).toBe(
            updateDto.description,
          );
          expect((response.body as ExpenseResponseDto).amount).toBe(
            updateDto.amount,
          );
        });
    });

    it("should return 404 Not Found if the expense does not exist", () => {
      return request(app.getHttpServer())
        .patch("/expense/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(404);
    });
  });

  describe("DELETE /expense/:id", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).delete(`/expense/1`).expect(401);
    });

    it("should return 403 Forbidden for a regular user", () => {
      return request(app.getHttpServer())
        .delete(`/expense/1`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(403);
    });

    it("should delete an expense for an ADMIN and return 200 OK", async () => {
      await request(app.getHttpServer())
        .delete(`/expense/1`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/expense/1`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });

    it("should delete an expense for a COORDINATOR and return 200 OK", async () => {
      const newExpenseResponse = await request(app.getHttpServer())
        .post("/expense")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send({
          description: "Temp Delete",
          amount: 10,
          date: "2025-01-01T00:00:00Z",
          tripId: 1,
          category: Category.FOOD,
        })
        .expect(201);
      const expenseIdToDelete = (newExpenseResponse.body as ExpenseResponseDto)
        .expense_id;

      await request(app.getHttpServer())
        .delete(`/expense/${expenseIdToDelete.toString()}`)
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/expense/${expenseIdToDelete.toString()}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });

    it("should return 404 Not Found if the expense does not exist", () => {
      return request(app.getHttpServer())
        .delete("/expense/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
