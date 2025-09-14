import { Category } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { ExpenseModule } from "src/expense/expense.module";
import request from "supertest";
import type { App } from "supertest/types";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { seedDatabase } from "../prisma/seeds";
import { cleanDatabases } from "./clean-database";

async function getAuthToken(server): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await request(server)
    .post("/auth/login")
    .send({
      email: "janusz@example.com",
      password: "123",
    })
    .expect(200);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return response.body.token;
}

const bilet = {
  title: "Bilet PKP",
  category: "Transport",
  amount: "21.37",
  date: "2025-08-13T00:00:00.000Z",
};

const wydatek = {
  title: "Wydatek testowy",
  category: Category.Jedzenie,
  amount: 200,
  date: "2025-08-13T00:00:00.000Z",
  trip_id: 1,
};

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;
  let tokenValue: string;

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
    const server = app.getHttpServer();

    tokenValue = await getAuthToken(server);
  });

  it("/expenses (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expenses")
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(bilet)]),
    );
  });

  it("/expenses (POST)", async () => {
    return request(app.getHttpServer())
      .post("/expenses")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send(wydatek)
      .expect(201);
  });

  it("/expenses (PATCH)", async () => {
    const response = await request(app.getHttpServer())
      .patch("/expenses/1")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send({
        title: "Wydatek updejt",
      })
      .expect(200);

    expect(response.body).toMatchObject({ ...bilet, title: "Wydatek updejt" });
  });

  it("/expenses/:id (DELETE)", async () => {
    const response = await request(app.getHttpServer())
      .delete(`/expenses/1`)
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toMatchObject(bilet);
  });

  it("/expenses (POST) validation", async () => {
    return request(app.getHttpServer())
      .post("/expenses")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send({
        title: "Wydatek testowy",
        category: Category.Jedzenie,
        amount: 200,
        date: "2999-01-01T00:00:00.000Z",
        trip_id: 1,
      })
      .expect(400);
  });
});
