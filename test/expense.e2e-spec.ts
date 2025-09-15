import { AppModule } from "src/app.module";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/roles/role.guard";
import { ExpenseModule } from "src/expense/expense.module";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("ExpenseController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ExpenseModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
    );
    await app.init();
  });
  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/expense (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          amount: 100,
          description: "Lunch",
          createdAt: expect.any(String),
          tripId: 1,
        }),
        expect.objectContaining({
          id: expect.any(Number),
          amount: 200,
          description: "Taxi",
          createdAt: expect.any(String),
          tripId: 1,
        }),
      ]),
    );
  });

  it("/expense (POST)", async () => {
    const badRequestDto = {
      amount: 123,
      description: "test",
      createdAt: new Date(Date.now()).toISOString(),
      tripId: 1,
    };
    await request(app.getHttpServer())
      .post("/expense")
      .send(badRequestDto)
      .expect(400);

    const dto = {
      amount: 123,
      description: "test",
      createdAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      tripId: 1,
    };

    const response = await request(app.getHttpServer())
      .post("/expense")
      .send(dto)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        amount: 123,
        description: "test",
        tripId: 1,
      }),
    );
  });

  it("/expense/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense/1")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        amount: 100,
        description: "Lunch",
        createdAt: expect.any(String),
        tripId: 1,
      }),
    );
  });

  it("/expense/:id (PATCH)", async () => {
    const updateDto = {
      amount: 999,
      description: "test",
    };

    const response = await request(app.getHttpServer())
      .patch("/expense/1")
      .send(updateDto)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        amount: 999,
        description: "test",
      }),
    );
  });

  it("/expense/:id (DELETE)", async () => {
    await request(app.getHttpServer()).delete("/expense/1").expect(204);
  });
});
