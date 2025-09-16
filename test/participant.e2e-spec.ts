import { PrismaClient, TripRole } from "@prisma/client";
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

describe("ParticipantController (e2e)", () => {
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

  it("/participant (GET) → should return a list of participants", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(response.body).toEqual(
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
    const seededParticipant = await prisma.participant.findFirst();

    const response = await request(app.getHttpServer())
      .get(`/participant/${seededParticipant?.participant_id}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        first_name: "Jan",
        last_name: "Kowalski",
        email: "jan.kowalski@example.com",
      }),
    );
  });

  it("/participant (POST) → should create a new participant", async () => {
    const trip = await prisma.trip.findFirst();

    const participantData = {
      first_name: "Edyta",
      last_name: "Kowalska",
      email: "edyta@gmail.com",
      TripRole: TripRole.MEMBER,
      trip_id: trip?.trip_id,
    };

    const response = await request(app.getHttpServer())
      .post("/participant")
      .send(participantData)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        participant_id: expect.any(Number),
        first_name: "Edyta",
        last_name: "Kowalska",
        email: "edyta@gmail.com",
      }),
    );
  });

  it("/participant/:id (PATCH) → should update a participant", async () => {
    const seededParticipant = await prisma.participant.findFirst();

    const updateData = {
      first_name: "Marek",
      last_name: "Kowalski",
      TripRole: TripRole.ORGANIZER,
    };

    const response = await request(app.getHttpServer())
      .patch(`/participant/${seededParticipant?.participant_id}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        first_name: "Marek",
        last_name: "Kowalski",
        TripRole: "ORGANIZER",
      }),
    );
  });

  it("/participant/:id (DELETE) → should delete a participant", async () => {
    const seededParticipant = await prisma.participant.findFirst();

    await request(app.getHttpServer())
      .delete(`/participant/${seededParticipant?.participant_id}`)
      .expect(204);
    await request(app.getHttpServer())
      .get(`/participant/${seededParticipant?.participant_id}`)
      .expect(404);
  });
});
