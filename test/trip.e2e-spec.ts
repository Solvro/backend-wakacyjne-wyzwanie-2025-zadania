/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { cleanDb as cleanDatabase } from "./clean-db";
import { seedDb as seedDatabase } from "./seed-db";

// Zmień ścieżkę na właściwą

describe("Trip E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
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
    if (app) {
      await app.close();
    }
  });

  it("GET /trip - powinno zwrócić listę wycieczek", async () => {
    const res = await request(app.getHttpServer()).get("/trip").expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("GET /trip/:id - powinno zwrócić jedną wycieczkę", async () => {
    const res = await request(app.getHttpServer()).get("/trip/1").expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
  });

  it("POST /trip - powinno stworzyć nową wycieczkę", async () => {
    const newTrip = {
      name: "Nowa wycieczka",
      destination: "Kraków",
      budget: 5000,
      startDate: "2025-06-01",
      endDate: "2025-06-10",
    };

    const res = await request(app.getHttpServer())
      .post("/trip")
      .send(newTrip)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Nowa wycieczka");
  });

  it("PATCH /trip/:id - powinno zaktualizować istniejącą wycieczkę", async () => {
    const updateData = { name: "Zaktualizowana wycieczka" };

    const res = await request(app.getHttpServer())
      .patch("/trip/1")
      .send(updateData)
      .expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body.name).toBe("Zaktualizowana wycieczka");
  });

  it("DELETE /trip/:id - powinno usunąć istniejącą wycieczkę", async () => {
    await request(app.getHttpServer()).delete("/trip/1").expect(200);

    await request(app.getHttpServer()).get("/trip/1").expect(404);
  });
});
