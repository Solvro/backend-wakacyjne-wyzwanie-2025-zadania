import type { LoginResponseDto } from "src/auth/dto/login-response.dto";
import type { CreateTripDto } from "src/trip/dto/create-trip.dto";
import type { TripResponsePrivateDto } from "src/trip/dto/trip-response-private.dto";
import type { TripResponsePublicDto } from "src/trip/dto/trip-response-public.dto";
import type { UpdateTripDto } from "src/trip/dto/update-trip.dto";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthModule } from "../src/auth/auth.module";
import { TripModule } from "../src/trip/trip.module";
import { seedDatabase } from "./seed-database";

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;
  let adminToken: string;
  let coordinatorToken: string;
  let userToken: string;

  beforeEach(async () => {
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule, AuthModule],
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

  describe("GET /trip", () => {
    it("should return 200 and a list of trips with details for authenticated users", () => {
      return request(app.getHttpServer())
        .get("/trip")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toBeInstanceOf(Array);
          const trips = response.body as TripResponsePrivateDto[];
          expect(trips.length).toBeGreaterThan(0);
          expect(trips[0]).toHaveProperty("trip_id");
          expect(trips[0]).toHaveProperty("description");
          expect(trips[0]).toHaveProperty("participants");
          expect(trips[0]).toHaveProperty("expenses");
        });
    });
  });

  describe("POST /trip", () => {
    const createTripDto: CreateTripDto = {
      description: "Summer Vacation",
      destination: "Hawaii",
      startDate: "2025-06-01",
      endDate: "2025-06-10",
    };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .post("/trip")
        .send(createTripDto)
        .expect(401);
    });

    it("should return 403 Forbidden for USER role", () => {
      return request(app.getHttpServer())
        .post("/trip")
        .set("Authorization", `Bearer ${userToken}`)
        .send(createTripDto)
        .expect(403);
    });

    it("should create a trip for ADMIN", async () => {
      const response: { body: TripResponsePublicDto } = await request(
        app.getHttpServer(),
      )
        .post("/trip")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(createTripDto)
        .expect(201);

      expect(response.body).toHaveProperty("trip_id");
      expect(response.body.description).toBe(createTripDto.description);
    });

    it("should create a trip for COORDINATOR", async () => {
      const response: { body: TripResponsePublicDto } = await request(
        app.getHttpServer(),
      )
        .post("/trip")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send({
          description: "Coordinator Trip",
          destination: "Alps",
          startDate: "2025-07-01",
          endDate: "2025-07-15",
        })
        .expect(201);

      expect(response.body).toHaveProperty("trip_id");
      expect(response.body.description).toBe("Coordinator Trip");
    });
  });

  describe("GET /trip/:id", () => {
    it("should return 200 with private details for authenticated user", () => {
      return request(app.getHttpServer())
        .get("/trip/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .expect((response) => {
          const trip = response.body as TripResponsePrivateDto;
          expect(trip.trip_id).toBe(1);
        });
    });

    it("should return 404 if trip does not exist", () => {
      return request(app.getHttpServer())
        .get("/trip/9999")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe("PATCH /trip/:id", () => {
    const updateTripDto: UpdateTripDto = {
      description: "Updated Trip",
    };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .patch("/trip/1")
        .send(updateTripDto)
        .expect(401);
    });

    it("should return 403 Forbidden for USER role", () => {
      return request(app.getHttpServer())
        .patch("/trip/1")
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTripDto)
        .expect(403);
    });

    it("should update a trip for ADMIN", async () => {
      const response: { body: TripResponsePublicDto } = await request(
        app.getHttpServer(),
      )
        .patch("/trip/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateTripDto)
        .expect(200);

      expect(response.body.description).toBe(updateTripDto.description);
    });

    it("should update a trip for COORDINATOR", async () => {
      const response: { body: TripResponsePublicDto } = await request(
        app.getHttpServer(),
      )
        .patch("/trip/1")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send(updateTripDto)
        .expect(200);

      expect(response.body.description).toBe(updateTripDto.description);
    });

    it("should return 404 if trip does not exist", () => {
      return request(app.getHttpServer())
        .patch("/trip/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateTripDto)
        .expect(404);
    });
  });

  describe("DELETE /trip/:id", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).delete("/trip/1").expect(401);
    });

    it("should return 403 Forbidden for USER role", () => {
      return request(app.getHttpServer())
        .delete("/trip/1")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(403);
    });

    it("should delete a trip for ADMIN", async () => {
      await request(app.getHttpServer())
        .delete("/trip/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get("/trip/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });

    it("should delete a trip for COORDINATOR", async () => {
      const createResponse: { body: TripResponsePublicDto } = await request(
        app.getHttpServer(),
      )
        .post("/trip")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send({
          description: "Temp Trip",
          destination: "Temp Place",
          startDate: "2025-08-01",
          endDate: "2025-08-15",
        })
        .expect(201);

      const tripId = createResponse.body.trip_id;

      await request(app.getHttpServer())
        .delete(`/trip/${tripId.toString()}`)
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/trip/${tripId.toString()}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });

    it("should return 404 if trip does not exist", () => {
      return request(app.getHttpServer())
        .delete("/trip/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
