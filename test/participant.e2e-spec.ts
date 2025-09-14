import { Role } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { seedDatabase } from "../prisma/seeds";
import { ParticipantModule } from "../src/participant/participant.module";
import { cleanDatabases } from "./clean-database";

async function getAuthToken(server): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const response = await request(server)
    .post("/auth/login")
    .send({
      email: "janusz@example.com",
      password: "123",
    })
    .expect(200);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return response.body.token;
}

const janusz1 = {
  name: "Janusz",
  email: "janusz@example.com",
  role: Role.Admin,
  isEnabled: true,
};

const janusz2 = {
  name: "Janusz2",
  email: "janusz2@example.com",
  password: "123",
  role: Role.Participant,
  isEnabled: true,
};

const user = {
  name: "user",
  email: "user@example.com",
  role: Role.Participant,
  isEnabled: true,
};

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;
  let tokenValue: string;

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const server = app.getHttpServer();

    tokenValue = await getAuthToken(server);
  });

  it("/participants (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participants")
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(janusz1),
        expect.objectContaining(user),
      ]),
    );
  });

  it("/participants (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/participants")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send(janusz2)
      .expect(201);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    expect(response.body).toEqual({
      ...janusz2,
      participant_id: expect.any(Number),
    });
  });

  it("/participants (PATCH)", async () => {
    const response = await request(app.getHttpServer())
      .patch("/participants/1")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send({
        name: "janek 123",
      })
      .expect(200);

    expect(response.body).toMatchObject({ ...janusz1, name: "janek 123" });
  });

  it("/participants/:id (DELETE)", async () => {
    const response = await request(app.getHttpServer())
      .delete(`/participants/2`)
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toMatchObject(user);

    await request(app.getHttpServer())
      .get(`/participants/2`)
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(404);
  });

  it("/participants (POST)", () => {
    return request(app.getHttpServer())
      .post("/participants")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send({
        name: "Janusz",
        role: Role.Admin,
        isEnabled: true,
      })
      .expect(400);
  });
});
