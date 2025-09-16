import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { ParticipantModule } from "../src/participant/participant.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { generateTestToken, validParticipant } from "./test-utils";

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;
  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const token = generateTestToken(1);

  it("/participant (POST)", async () => {
    return request(app.getHttpServer())
      .post("/participant")
      .send(await validParticipant())
      .expect(201)
      .then((participant) => {
        expect(participant.body).toEqual({
          id: expect.any(Number) as unknown,
          name: "Jan",
          surname: "Kowalski",
          role: "USER",
          account_type: "BASIC",
          email: "JanKowalski@example.com",
        });
      });
  });

  it("/participant (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(response.body).toEqual([
      {
        name: "Marek",
        id: 1,
        account_type: "BASIC",
        role: "USER",
      },
      {
        name: "Marek",
        id: 2,
        account_type: "BASIC",
        role: "ADMIN",
      },
    ]);
  });

  it("/participant/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant/1")
      .expect(200);

    expect(response.body).toEqual({
      name: "Marek",
      email: "abcd@example.com",
      surname: "Kowalski",
      id: 1,
      account_type: "BASIC",
      role: "USER",
    });
  });

  it("/participant (PATCH) should be able to patch yourself", async () => {
    const response = await request(app.getHttpServer())
      .patch("/participant")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jan" })
      .expect(200);

    expect(response.body).toEqual({
      account_type: "BASIC",
      email: "abcd@example.com",
      id: 1,
      name: "Jan",
      role: "USER",
      surname: "Kowalski",
    });
  });

  it("/participant (PATCH) should get an error when patching someone else without permissions", async () => {
    await request(app.getHttpServer())
      .patch("/participant")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 2, name: "Jan" })
      .expect(401);
  });

  it("/participant (DELETE) should be able to delete yourself", async () => {
    const response = await request(app.getHttpServer())
      .delete("/participant")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1 })
      .expect(200);

    expect(response.body).toEqual({
      account_type: "BASIC",
      email: "abcd@example.com",
      id: 1,
      name: "Marek",
      role: "USER",
      surname: "Kowalski",
      password: expect.any(String) as unknown,
    });
  });
  it("/participant (DELETE) shouldn't be able to delete somebody else without admin role", async () => {
    await request(app.getHttpServer())
      .delete("/participant")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 2 })
      .expect(401);
  });
});
