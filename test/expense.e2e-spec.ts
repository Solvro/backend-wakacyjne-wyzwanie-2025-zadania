/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthGuard } from "src/auth/auth.guard";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { cleanDb as cleanDatabase } from "./clean-db";
import { seedDb as seedDatabase } from "./seed-db";

describe("Expense E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard) // Wyłącz JWT guard
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          // symulujemy zalogowanego admina
          req.user = {
            sub: "john@example.com",
            role: "ADMIN",
          };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /expense - powinno zwrócić listę wydatków", async () => {
    const res = await request(app.getHttpServer()).get("/expense").expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /expense/:id - powinno zwrócić jeden wydatek", async () => {
    const res = await request(app.getHttpServer())
      .get("/expense/1")
      .expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("description");
  });

  it("POST /expense - powinno utworzyć nowy wydatek", async () => {
    const newExpense = {
      description: "Test Expense",
      cost: 123.45,
      type: "FOOD",
      tripId: 1,
      payerId: 1,
    };

    const res = await request(app.getHttpServer())
      .post("/expense")
      .send(newExpense)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.description).toBe("Test Expense");
  });

  it("PATCH /expense/:id - powinno zaktualizować istniejący wydatek", async () => {
    const updateData = { description: "Updated Expense" };

    const res = await request(app.getHttpServer())
      .patch("/expense/1")
      .send(updateData)
      .expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body.description).toBe("Updated Expense");
  });

  it("DELETE /expense/:id - powinno usunąć istniejący wydatek", async () => {
    await request(app.getHttpServer()).delete("/expense/1").expect(200);

    // sprawdzamy czy usunięty
    await request(app.getHttpServer()).get("/expense/1").expect(404);
  });
});
