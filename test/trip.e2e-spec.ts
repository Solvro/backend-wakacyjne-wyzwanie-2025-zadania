/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/restrict-template-expressions */
import { trip_type } from "@prisma/client";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { RoleGuard } from "../src/auth/roles/role.guard";
import { clear } from "./utils/clear";
import prisma from "./utils/prisma";

describe("TripsController (e2e)", () => {
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

  it("POST /trip - tworzy wycieczkę", async () => {
    const response = await request(app.getHttpServer())
      .post("/trip")
      .send({
        destination: "Smolec",
        type: trip_type.sightseeing,
        start_date: "2024-09-15T00:00:00.000Z",
        end_date: "2024-09-18T00:00:00.000Z",
      })
      .expect(201);

    expect(response.body.destination).toBe("Smolec");
  });

  it("GET /trip - zwraca listę wycieczek", async () => {
    await prisma.trip.create({
      data: {
        destination: "Warszawa",
        type: "business",
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);
    expect(response.body.length).toBe(1);
  });

  it("GET /trip/:id - zwraca wycieczkę", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Gdańsk",
        type: "leisure",
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/trip/${trip.id}`)
      .expect(200);

    expect(response.body.destination).toBe("Gdańsk");
  });

  it("DELETE /trip/:id - usuwa wycieczkę", async () => {
    const trip = await prisma.trip.create({
      data: {
        destination: "Zakopane",
        type: "adventure",
        start_date: new Date(),
        end_date: new Date(),
      },
    });

    await request(app.getHttpServer()).delete(`/trip/${trip.id}`).expect(200);

    const deleted = await prisma.trip.findUnique({ where: { id: trip.id } });
    expect(deleted).toBeNull();
  });
});
