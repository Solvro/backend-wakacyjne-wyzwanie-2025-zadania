import { PrismaClient } from "@prisma/client";
import request from "supertest";

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { TripRoleGuard } from "../src/auth/roles/trip-role.guard";
import { RoleGuard } from "../src/auth/roles/user-role.guard";
import { cleanDb } from "../test/utils/clean-db";
import { seedDb } from "../test/utils/seed-db";

const prisma = new PrismaClient();

describe("TripController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    await cleanDb();
    await seedDb();

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
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Weekend w Krakowie",
          destination: "Kraków",
        }),
      ]),
    );
  });

  it("/trip/:id (GET) → should return a single trip", async () => {
    const seededTrip = await prisma.trip.findFirst();

    const response = await request(app.getHttpServer())
      .get(`/trip/${seededTrip?.trip_id}`)
      .expect(200);

    expect(response.body).toEqual(
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

    const response = await request(app.getHttpServer())
      .post("/trip")
      .send(tripData)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        trip_id: expect.any(Number),
        name: "Test Trip",
        destination: "Warszawa",
      }),
    );
  });

  it("/trip/:id (PATCH) → should update a trip", async () => {
    const seededTrip = await prisma.trip.findFirst();

    const updateData = {
      name: "Updated Trip",
      destination: "Gdańsk",
    };

    const response = await request(app.getHttpServer())
      .patch(`/trip/${seededTrip?.trip_id}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Updated Trip",
        destination: "Gdańsk",
      }),
    );
  });

  it("/trip/:id (DELETE) → should delete a trip", async () => {
    const seededTrip = await prisma.trip.findFirst();

    await request(app.getHttpServer())
      .delete(`/trip/${seededTrip?.trip_id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/trip/${seededTrip?.trip_id}`)
      .expect(404);
  });
});
