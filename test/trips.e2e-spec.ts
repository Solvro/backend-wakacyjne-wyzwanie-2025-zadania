import { PrismaClient } from "@prisma/client";
import type { Server } from "node:http";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { TripRoleGuard } from "../src/auth/roles/trip-role.guard";
import { RoleGuard } from "../src/auth/roles/user-role.guard";
import { cleanDatabase } from "./utils/clean-database";
import { seedDatabase } from "./utils/seed-database";

const prisma = new PrismaClient();

describe("TripController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(TripRoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.init();
  });

  it("/trip (GET) → should return a list of trips", async () => {
    const response = await request(app.getHttpServer() as Server)
      .get("/trip")
      .expect(200);

    const body = response.body as {
      name: string;
      destination: string;
    }[];

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Weekend w Krakowie",
          destination: "Kraków",
        }),
      ]),
    );
  });

  it("/trip/:id (GET) → should return a single trip", async () => {
    const seededTrip = await prisma.trip.findFirstOrThrow();
    const tripId: number = seededTrip.trip_id;

    const response = await request(app.getHttpServer() as Server)
      .get(`/trip/${String(tripId)}`)
      .expect(200);

    const body = response.body as {
      name: string;
      destination: string;
    };

    expect(body).toEqual(
      expect.objectContaining({
        name: "Weekend w Krakowie",
        destination: "Kraków",
      }),
    );
  });

  it("/trip (POST) → should create a new trip", async () => {
    const tripData = {
      name: "Test Trip",
      destination: "Warszawa",
      start_date: new Date().toISOString(),
      budget: 2000,
    };

    const response = await request(app.getHttpServer() as Server)
      .post("/trip")
      .send(tripData)
      .expect(201);

    const body = response.body as {
      trip_id: number;
      name: string;
      destination: string;
    };

    expect(body).toEqual(
      expect.objectContaining({
        trip_id: expect.any(Number) as unknown as number,
        name: "Test Trip",
        destination: "Warszawa",
      }),
    );
  });

  it("/trip/:id (PATCH) → should update a trip", async () => {
    const seededTrip = await prisma.trip.findFirstOrThrow();
    const tripId: number = seededTrip.trip_id;

    const updateData = {
      name: "Updated Trip",
      destination: "Gdańsk",
    };

    const response = await request(app.getHttpServer() as Server)
      .patch(`/trip/${String(tripId)}`)
      .send(updateData)
      .expect(200);

    const body = response.body as {
      name: string;
      destination: string;
    };

    expect(body).toEqual(
      expect.objectContaining({
        name: "Updated Trip",
        destination: "Gdańsk",
      }),
    );
  });

  it("/trip/:id (DELETE) → should delete a trip", async () => {
    const seededTrip = await prisma.trip.findFirstOrThrow();
    const tripId: number = seededTrip.trip_id;

    await request(app.getHttpServer() as Server)
      .delete(`/trip/${String(tripId)}`)
      .expect(200);

    await request(app.getHttpServer() as Server)
      .get(`/trip/${String(tripId)}`)
      .expect(404);
  });
});
