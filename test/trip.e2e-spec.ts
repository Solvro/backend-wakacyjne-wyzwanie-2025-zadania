import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { TripModule } from "src/trip/trip.module";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { seedDatabase } from "../prisma/seeds";
import { cleanDatabases } from "./clean-database";

const wroclaw = {
  name: "Wycieczka do Wrocławia",
  date_start: "2025-08-13T00:00:00.000Z",
  date_end: "2025-08-14T00:00:00.000Z",
  description: "wycieczka na politechnike",
};

const wycieczka = {
  name: "Wycieczka 1",
  date_start: "2025-09-09T00:00:00.000Z",
  date_end: "2025-09-10T00:00:00.000Z",
  description: "Super fajowa wycieczka 1",
};

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
describe("TripController (e2e)", () => {
  let app: INestApplication<App>;
  let tokenValue: string;

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const server = app.getHttpServer();

    tokenValue = await getAuthToken(server);
  });

  it("/trips (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trips")
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(wroclaw)]),
    );
  });

  it("/trips (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/trips")
      .set("Authorization", `Bearer ${tokenValue}`)
      .send(wycieczka)
      .expect(201);

    expect(response.body).toEqual({ ...wycieczka, trip_id: 2 });
  });

  it("trips (PATCH)", async () => {
    const response = await request(app.getHttpServer())
      .patch("/trips/1")
      .send({
        name: "Wycieczka do Wrocławia updejt",
      })
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual({
      ...wroclaw,
      name: "Wycieczka do Wrocławia updejt",
      trip_id: 1,
    });
  });

  it("/trips/:id (DELETE)", async () => {
    const response = await request(app.getHttpServer())
      .delete("/trips/1")
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual({ ...wroclaw, trip_id: 1 });

    await request(app.getHttpServer()).get("/trips/1").expect(404);
  });
});
