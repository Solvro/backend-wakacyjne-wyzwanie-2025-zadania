import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Expenses (e2e)", () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    try {
      await prisma.expense.deleteMany();
      await prisma.trip.deleteMany();
      await prisma.user.deleteMany();
    } catch (error) {
      console.warn("Warning: Initial cleanup failed:", error);
    }
  });

  afterAll(async () => {
    try {
      await prisma.expense.deleteMany();
      await prisma.trip.deleteMany();
      await prisma.user.deleteMany();
    } catch (error) {
      console.warn("Warning: Database cleanup failed:", error);
    }
    await app.close();
  });

  describe("/expenses (GET)", () => {
    it("should return empty array when no expenses", () => {
      return request(app.getHttpServer())
        .get("/expenses")
        .expect(200)
        .expect([]);
    });
  });

  describe("/expenses (POST)", () => {
    it("should create a new expense", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User Post",
          email: "testpost@test.com",
          password: "password123",
        },
      });

      const trip = await prisma.trip.create({
        data: {
          name: "Test Trip Post",
          description: "Test Description",
          destination: "Test Destination",
          travel_type: "PLANE",
          start_date: new Date("2025-12-01"),
          end_date: new Date("2025-12-10"),
          coordinator_id: user.id,
        },
      });

      const expenseData = {
        price: 100,
        user_id: user.id,
        trip_id: trip.id,
      };

      return request(app.getHttpServer())
        .post("/expenses")
        .send(expenseData)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("id");
          expect(response.body).toHaveProperty("price", 100);
          expect(response.body).toHaveProperty("user_id", user.id);
          expect(response.body).toHaveProperty("trip_id", trip.id);
        });
    });
  });

  describe("/expenses/:id (GET)", () => {
    it("should return expense by id", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User 2",
          email: "test2@test.com",
          password: "password123",
        },
      });

      const trip = await prisma.trip.create({
        data: {
          name: "Test Trip 2",
          description: "Test Description",
          destination: "Test Destination",
          travel_type: "PLANE",
          start_date: new Date("2025-12-01"),
          end_date: new Date("2025-12-10"),
          coordinator_id: user.id,
        },
      });

      const expense = await prisma.expense.create({
        data: {
          price: 150,
          user_id: user.id,
          trip_id: trip.id,
        },
      });

      return request(app.getHttpServer())
        .get(`/expenses/${expense.id.toString()}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", expense.id);
          expect(response.body).toHaveProperty("price", 150);
        });
    });
  });

  describe("/expenses/:id (PATCH)", () => {
    it("should update an expense", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User 3",
          email: "test3@test.com",
          password: "password123",
        },
      });

      const trip = await prisma.trip.create({
        data: {
          name: "Test Trip 3",
          description: "Test Description",
          destination: "Test Destination",
          travel_type: "PLANE",
          start_date: new Date("2025-12-01"),
          end_date: new Date("2025-12-10"),
          coordinator_id: user.id,
        },
      });

      const expense = await prisma.expense.create({
        data: {
          price: 200,
          user_id: user.id,
          trip_id: trip.id,
        },
      });

      const updateData = {
        price: 250,
      };

      return request(app.getHttpServer())
        .patch(`/expenses/${expense.id.toString()}`)
        .send(updateData)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", expense.id);
          expect(response.body).toHaveProperty("price", 250);
        });
    });
  });

  describe("/expenses/:id (DELETE)", () => {
    it("should delete an expense", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User 4",
          email: "test4@test.com",
          password: "password123",
        },
      });

      const trip = await prisma.trip.create({
        data: {
          name: "Test Trip 4",
          description: "Test Description",
          destination: "Test Destination",
          travel_type: "PLANE",
          start_date: new Date("2025-12-01"),
          end_date: new Date("2025-12-10"),
          coordinator_id: user.id,
        },
      });

      const expense = await prisma.expense.create({
        data: {
          price: 300,
          user_id: user.id,
          trip_id: trip.id,
        },
      });

      return request(app.getHttpServer())
        .delete(`/expenses/${expense.id.toString()}`)
        .expect(200);
    });
  });
});
