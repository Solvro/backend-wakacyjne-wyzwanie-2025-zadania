/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../src/database/database.service";
import { TripModule } from "../src/trip/trip.module";
import { AppModule } from "./../src/app.module";
import { authRequest } from "./auth-request";
import { cleanDatabase } from "./clean-database";
import { loginAdmin } from "./login-admin";
import { seedDatabase } from "./seed-database";

let prisma: DatabaseService;
let adminToken: string;
let app: INestApplication;

describe("TripController (e2e)", () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule],
    }).compile();

    prisma = moduleFixture.get(DatabaseService);
    app = moduleFixture.createNestApplication();

    const validationOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase(prisma); // wipe the testing database using special script
    await seedDatabase(prisma); // add some data to database
    adminToken = await loginAdmin(prisma, app);
  });

  it("/trip (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tripId: expect.any(Number),
          participantId: expect.any(Number),
          destination: "Japonia",
          startDate: "2025-07-01T00:00:00.000Z",
          endDate: "2025-07-14T00:00:00.000Z",
        }),
        expect.objectContaining({
          tripId: expect.any(Number),
          participantId: expect.any(Number),
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
        tripId: expect.any(Number),
        participantId: expect.any(Number),
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

    await authRequest(app.getHttpServer(), adminToken)("post", "/trip")
      .send(dto)
      .expect(201)
      .then((trip) => {
        expect(trip.body).toEqual({
          tripId: expect.any(Number),
          participantId: expect.any(Number),
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
    return authRequest(app.getHttpServer(), adminToken)("patch", "/trip/2")
      .send({
        destination: "New Island",
      })
      .expect(200)
      .then((trip) => {
        expect(trip.body).toEqual({
          tripId: expect.any(Number),
          participantId: expect.any(Number),
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

    const response = await authRequest(app.getHttpServer(), adminToken)(
      "delete",
      `/trip/${String(trip.tripId)}`,
    ).expect(200);

    expect(response.body).toEqual({
      tripId: trip.tripId,
      participantId: expect.any(Number),
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
