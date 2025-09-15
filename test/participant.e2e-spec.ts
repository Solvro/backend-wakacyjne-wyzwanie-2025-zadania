/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Sex } from "@prisma/client";
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { DatabaseService } from "../src/database/database.service";
import { ParticipantModule } from "../src/participant/participant.module";
import { cleanDatabase } from "./clean-database";
import { loginAdmin } from "./login-admin";
import { seedDatabase } from "./seed-database";

let prisma: DatabaseService;
let adminToken: string;
let app: INestApplication;

describe("ParticipantController (e2e)", () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule],
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

  it("/participant (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          participantId: expect.any(Number),
          firstName: "Ala",
          lastName: "Makota",
          address: "Zielona 3",
          phoneNumber: "2137",
          email: "ala.makota@example.com",
          sex: "FEMALE",
        }),
        expect.objectContaining({
          participantId: expect.any(Number),
          firstName: "Jan",
          lastName: "Paweł",
          address: "Kremówkowa 2",
          phoneNumber: null,
          email: "barka@gmail.com",
          sex: "MALE",
        }),
      ]),
    );
  });

  it("/participant/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant/1")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        participantId: expect.any(Number),
        firstName: "Ala",
        lastName: "Makota",
        address: "Zielona 3",
        phoneNumber: "2137",
        email: "ala.makota@example.com",
        sex: "FEMALE",
      }),
    );
  });

  it("/participant (POST)", async () => {
    // creating participant with authorization

    return request(app.getHttpServer())
      .post("/participant")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Test",
        lastName: "Participant",
        address: "Future",
        phoneNumber: "1234",
        email: "ala.makota@example.com",
        sex: Sex.OTHER,
      })
      .expect(201)
      .then((participant) => {
        expect(participant.body).toEqual({
          participantId: expect.any(Number),
          firstName: "Test",
          lastName: "Participant",
          address: "Future",
          phoneNumber: "1234",
          email: "ala.makota@example.com",
          sex: Sex.OTHER,
        });
      });
  });

  // check if custom validator (No spaces) works properly
  it("/participant (POST) validator", async () => {
    return request(app.getHttpServer())
      .post("/participant")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "Test",
        lastName: "Participant",
        address: "Future",
        phoneNumber: "1234",
        email: "Wrong Email", // email cannot have spaces
        sex: "OTHER",
      })
      .expect(400);
  });

  // check for guards
  it("/participant (POST) guard", async () => {
    return request(app.getHttpServer())
      .post("/participant")
      .send({
        firstName: "Test",
        lastName: "Participant",
        address: "Future",
        phoneNumber: "1234",
        email: "email123",
        sex: "OTHER",
      })
      .expect(401); // without coordinator or admin token its not possible to make a participant
  });

  it("/participant/:id (PATCH)", async () => {
    return request(app.getHttpServer())
      .patch("/participant/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        phoneNumber: "09867",
      })
      .expect(200)
      .then((participant) => {
        expect(participant.body).toEqual({
          participantId: expect.any(Number),
          firstName: "Jan",
          lastName: "Paweł",
          address: "Kremówkowa 2",
          phoneNumber: "09867",
          email: "barka@gmail.com",
          sex: "MALE",
        });
      });
  });

  it("/participant/:id (DELETE)", async () => {
    const participant = await prisma.participant.create({
      data: {
        firstName: "Test",
        lastName: "Participant",
        address: "Future",
        phoneNumber: "1234",
        email: "ala.makota@example.com",
        sex: "OTHER",
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/participant/${String(participant.participantId)}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual({
      participantId: participant.participantId,
      firstName: "Test",
      lastName: "Participant",
      address: "Future",
      phoneNumber: "1234",
      email: "ala.makota@example.com",
      sex: Sex.OTHER,
    });

    // Checking if the participant really was deleted (not found)
    await request(app.getHttpServer())
      .get(`/participant/${String(participant.participantId)}`)
      .expect(404);
  });
});
