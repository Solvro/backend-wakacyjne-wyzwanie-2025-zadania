/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { UserModule } from "../src/user/user.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("Expenses E2E", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /expense - powinno zwrócić wydatki", async () => {
    return request(app.getHttpServer()).get("/expense").expect(200);
  });

  it("POST /expense - powinno dodać wydatek", async () => {
    return request(app.getHttpServer())
      .post("/expense")
      .send({ description: "Hotel", amount: 200, trip_id: 1 })
      .expect(201);
  });

  it("GET /expense/:id - powinno zwrócić wydatek", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/expense")
      .send({ description: "Test Get Expense", amount: 100, trip_id: 1 })
      .expect(201);

    const expenseId: number = createResponse.body.id;

    return request(app.getHttpServer())
      .get(`/expense/${String(expenseId)}`)
      .expect(200);
  });

  it("PATCH /expense/:id - powinno zaktualizować wydatek", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/expense")
      .send({ description: "Test Update Expense", amount: 100, trip_id: 1 })
      .expect(201);

    const expenseId = createResponse.body.id;

    return request(app.getHttpServer())
      .patch(`/expense/${String(expenseId)}`)
      .send({ amount: 250 })
      .expect(200);
  });

  it("DELETE /expense/:id - powinno usunąć wydatek", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/expense")
      .send({ description: "Test Expense", amount: 100, trip_id: 1 })
      .expect(201);

    const expenseId = createResponse.body.id;

    return request(app.getHttpServer())
      .delete(`/expense/${String(expenseId)}`)
      .expect(204);
  });
});
