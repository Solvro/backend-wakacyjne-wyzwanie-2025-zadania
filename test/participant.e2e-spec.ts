import type { Participant, Trip } from "@prisma/client";
import { PrismaClient, TripRole } from "@prisma/client";
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

describe("ParticipantController (e2e)", () => {
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

  it("/participant (GET) → should return a list of participants", async () => {
    const response = await request(app.getHttpServer() as unknown as Server)
      .get("/participant")
      .expect(200);

    const body: unknown = response.body;

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          first_name: "Jan",
          last_name: "Kowalski",
          email: "jan.kowalski@example.com",
        }),
      ]),
    );
  });

  it("/participant/:id (GET) → should return a single participant", async () => {
    const seededParticipant: Participant | null =
      await prisma.participant.findFirst();
    if (seededParticipant == null) {
      throw new Error("No participant seeded");
    }

    const response = await request(app.getHttpServer() as unknown as Server)
      .get(`/participant/${String(seededParticipant.participant_id)}`)
      .expect(200);

    const body: unknown = response.body;

    expect(body).toEqual(
      expect.objectContaining({
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan.kowalski@example.com",
      }),
    );
  });

  it("/participant (POST) → should create a new participant", async () => {
    const trip: Trip | null = await prisma.trip.findFirst();
    if (trip == null) {
      throw new Error("No trip seeded");
    }

    const participantData = {
      first_name: "Edyta",
      last_name: "Kowalska",
      email: "edyta@gmail.com",
      TripRole: TripRole.MEMBER,
      trip_id: trip.trip_id,
    };

    const response = await request(app.getHttpServer() as unknown as Server)
      .post("/participant")
      .send(participantData)
      .expect(201);

    const body = response.body as Participant;

    expect(body.participant_id).toEqual(expect.any(Number));
    expect(body).toEqual(
      expect.objectContaining({
        first_name: "Edyta",
        last_name: "Kowalska",
        email: "edyta@gmail.com",
      }),
    );
  });

  it("/participant (POST) → should fail if trip does not exist", async () => {
    const invalidTripId = 999;

    const participantData = {
      first_name: "Ghost",
      last_name: "User",
      email: "ghost@example.com",
      TripRole: TripRole.MEMBER,
      trip_id: invalidTripId,
    };

    const response = await request(app.getHttpServer() as unknown as Server)
      .post("/participant")
      .send(participantData)
      .expect(404);

    const body = response.body as unknown as { message: string | string[] };

    expect(body.message).toEqual(expect.stringContaining("Trip with ID"));
  });

  it("/participant/:id (PATCH) → should update a participant", async () => {
    const seededParticipant: Participant | null =
      await prisma.participant.findFirst();
    if (seededParticipant == null) {
      throw new Error("No participant seeded");
    }

    const updateData = {
      first_name: "Marek",
      last_name: "Kowalski",
      TripRole: TripRole.ORGANIZER,
    };

    const response = await request(app.getHttpServer() as unknown as Server)
      .patch(`/participant/${String(seededParticipant.participant_id)}`)
      .send(updateData)
      .expect(200);

    const body: unknown = response.body;

    expect(body).toEqual(
      expect.objectContaining({
        first_name: "Marek",
        last_name: "Kowalski",
        TripRole: "ORGANIZER",
      }),
    );
  });

  it("/participant/:id (DELETE) → should delete a participant", async () => {
    const seededParticipant: Participant | null =
      await prisma.participant.findFirst();
    if (seededParticipant == null) {
      throw new Error("No participant seeded");
    }

    await request(app.getHttpServer() as unknown as Server)
      .delete(`/participant/${String(seededParticipant.participant_id)}`)
      .expect(204);

    await request(app.getHttpServer() as unknown as Server)
      .get(`/participant/${String(seededParticipant.participant_id)}`)
      .expect(404);
  });
});
