import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Trips (e2e)", () => {
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

  describe("/trips (GET)", () => {
    it("should return empty array when no trips", () => {
      return request(app.getHttpServer()).get("/trips").expect(200).expect([]);
    });
  });

  describe("/trips/:id (GET)", () => {
    it("should return trip by id", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User Get",
          email: "testget@test.com",
          password: "password123",
        },
      });

      const trip = await prisma.trip.create({
        data: {
          name: "Test Trip",
          description: "Test Description",
          destination: "Test Destination",
          travel_type: "PLANE",
          start_date: new Date("2025-12-01"),
          end_date: new Date("2025-12-10"),
          coordinator_id: user.id,
        },
      });

      return request(app.getHttpServer())
        .get(`/trips/${trip.id.toString()}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", trip.id);
          expect(response.body).toHaveProperty("name", "Test Trip");
          expect(response.body).toHaveProperty("coordinator");
        });
    });
  });

  describe("/trips (POST)", () => {
    it("should return 401 when not authenticated", async () => {
      const tripData = {
        name: "New Trip",
        description: "New Description",
        destination: "New Destination",
        travel_type: "PLANE",
        start_date: "2025-12-01",
        end_date: "2025-12-10",
      };

      return request(app.getHttpServer())
        .post("/trips")
        .send(tripData)
        .expect(401);
    });
  });
});
