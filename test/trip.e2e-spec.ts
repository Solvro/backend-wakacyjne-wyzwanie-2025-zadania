import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import type { App } from "supertest/types";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../src/database/database.service";
import { TripModule } from "../src/trip/trip.module";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

let prisma: DatabaseService;
let adminToken: string;

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;

  const adminUser = {
    email: "admin134@example.com",
    password: "admin123dsad",
    role: Role.ADMIN,
    isEnabled: true,
    name: "Admin",
    aboutMe: "None",
  };

  interface LoginResponse {
    token: string;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule],
    }).compile();

    prisma = moduleFixture.get(DatabaseService);
    await cleanDatabase(prisma); // wipe the testing database using special script
    await seedDatabase(prisma); // add some data to database

    app = moduleFixture.createNestApplication();

    const validationOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();

    const salt = 10;
    const hashedPassword = await hash(adminUser.password, salt);

    const admin = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });
    if (admin === null) {
      await prisma.user.create({
        data: { ...adminUser, password: hashedPassword },
      });
    }
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    const body = response.body as LoginResponse;
    adminToken = body.token;
  });

  it("/trip (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tripId: 1,
          participantId: 1,
          destination: "Japonia",
          startDate: "2025-07-01T00:00:00.000Z",
          endDate: "2025-07-14T00:00:00.000Z",
        }),
        expect.objectContaining({
          tripId: 2,
          participantId: 2,
          destination: "Berlin",
          startDate: "2025-08-10T00:00:00.000Z",
          endDate: "2025-08-15T00:00:00.000Z",
        }),
      ]),
    );
  });

  it("/trip/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip/1")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        tripId: 1,
        participantId: 1,
        destination: "Japonia",
        startDate: "2025-07-01T00:00:00.000Z",
        endDate: "2025-07-14T00:00:00.000Z",
      }),
    );
  });

  it("/trip (POST)", async () => {
    // creating trip with authorization
    const dto = {
      participantId: 1,
      destination: "Poland",
      startDate: "2026-06-10T00:00:00.000Z",
      endDate: "2026-08-11T00:00:00.000Z",
    };
    return request(app.getHttpServer())
      .post("/trip")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(dto)
      .expect(201)
      .then((trip) => {
        expect(trip.body).toEqual({
          tripId: 3, // jak zaaplikować expect.any(Number)
          participantId: 1,
          destination: "Poland",
          startDate: "2026-06-10T00:00:00.000Z",
          endDate: "2026-08-11T00:00:00.000Z",
        });
      });
  });

  // check if guards work correctly
  it("/trip (POST)", async () => {
    return request(app.getHttpServer())
      .post("/trip")
      .send({
        participantId: 1,
        destination: "Poland",
        startDate: "2026-06-10T00:00:00.000Z",
        endDate: "2026-08-11T00:00:00.000Z",
      })
      .expect(401); // without coordinator or admin token its not possible to make a trip
  });

  it("/trip/:id (PATCH)", async () => {
    return request(app.getHttpServer())
      .patch("/trip/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        destination: "New Island",
      })
      .expect(200)
      .then((trip) => {
        expect(trip.body).toEqual({
          tripId: 2,
          participantId: 2,
          destination: "New Island",
          startDate: "2025-08-10T00:00:00.000Z",
          endDate: "2025-08-15T00:00:00.000Z",
        });
      });
  });

  it("/trip/:id (DELETE)", async () => {
    const trip = await prisma.trip.create({
      data: {
        participantId: 2,
        destination: "Poland",
        startDate: "2026-06-10T00:00:00.000Z",
        endDate: "2026-08-11T00:00:00.000Z",
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/trip/${String(trip.tripId)}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual({
      tripId: trip.tripId,
      participantId: 2,
      destination: "Poland",
      startDate: "2026-06-10T00:00:00.000Z",
      endDate: "2026-08-11T00:00:00.000Z",
    });

    // Checking if the trip really was deleted (not found)
    await request(app.getHttpServer())
      .get(`/trip/${String(trip.tripId)}`)
      .expect(404);
  });
});
