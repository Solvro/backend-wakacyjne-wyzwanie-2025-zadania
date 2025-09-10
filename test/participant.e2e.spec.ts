/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/restrict-template-expressions */
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { RoleGuard } from "../src/auth/roles/role.guard";
import { clear } from "./utils/clear";
import prisma from "./utils/prisma";

describe("ParticipantsController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /participants - tworzy uczestnika", async () => {
    const response = await request(app.getHttpServer())
      .post("/participant")
      .send({
        name: "Jan",
        surname: "Kowalski",
        age: 28,
        phone_num: "+48123456789",
      })
      .expect(201);

    expect(response.body.name).toBe("Jan");
  });

  it("GET /participant - zwraca listę uczestników", async () => {
    await prisma.participant.create({
      data: {
        name: "Adam",
        surname: "Nowak",
        age: 30,
      },
    });
    await prisma.participant.create({
      data: {
        name: "Adam",
        surname: "Nowak",
        age: 30,
      },
    });
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(response.body.length).toBe(2);
  });
  it("PATCH /participant - modyfikuje istniejacego uczestnika", async () => {
    const partcipant = await prisma.participant.create({
      data: {
        name: "Jan",
        surname: "Kowalski",
        age: 30,
      },
    });
    const response = await request(app.getHttpServer())
      .patch(`/participant/${partcipant.id}`)
      .send({
        surname: "Nowak",
      })
      .expect(200);
    expect(response.body.surname).toBe("Nowak");
    expect(response.body.id).toBe(partcipant.id);
  });
  it("GET /participant/:id - zwraca uczestnika po id", async () => {
    const participant = await prisma.participant.create({
      data: {
        name: "Adam",
        surname: "Nowak",
        age: 30,
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/participant/${participant.id}`)
      .expect(200);

    expect(response.body.id).toBe(participant.id);
    expect(response.body.name).toBe("Adam");
  });
  it("DELETE /participant/:id - usuwa uczestnika po id", async () => {
    const participant = await prisma.participant.create({
      data: {
        name: "Adam",
        surname: "Nowak",
        age: 30,
      },
    });

    await request(app.getHttpServer())
      .delete(`/participant/${participant.id}`)
      .expect(200);

    const deletedParticipant = await prisma.participant.findUnique({
      where: { id: participant.id },
    });
    expect(deletedParticipant).toBeNull();
  });
});
