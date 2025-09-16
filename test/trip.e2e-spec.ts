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
import type { AuthResponse, UserData } from "./test-interfaces";

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

async function getAuthToken(server: App, userData: UserData) {
  const response = await request(server)
    .post("/auth/login")
    .send({
      email: userData.email,
      password: userData.password,
    })
    .expect(200);

  return (response.body as AuthResponse).token;
}

const userData: UserData = {
  email: "user@example.com",
  password: "123",
};

const adminData: UserData = {
  email: "janusz@example.com",
  password: "123",
};

const coordinatorData: UserData = {
  email: "coordinator@example.com",
  password: "123",
};

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/trips (GET)", async () => {
    const tokenValue: string = await getAuthToken(
      app.getHttpServer(),
      adminData,
    );

    const response = await request(app.getHttpServer())
      .get("/trips")
      .set("Authorization", `Bearer ${tokenValue}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(wroclaw)]),
    );
  });

  describe("/trips (POST)", () => {
    it("should return 403 when logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );

      await request(app.getHttpServer())
        .post("/trips")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send("wycieczka")
        .expect(403);
    });

    it("should return 201 when logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );

      const response = await request(app.getHttpServer())
        .post("/trips")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(wycieczka)
        .expect(201);

      expect(response.body).toEqual({ ...wycieczka, trip_id: 2 });
    });

    it("should return 401 if no token provided", async () => {
      await request(app.getHttpServer())
        .post("/trips")
        .send(wycieczka)
        .expect(401);
    });
  });

  describe("/trips (PATCH)", () => {
    it("should return 200 when logged as adminstator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );

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

    it("should return 200 when logged as trip coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );

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

    it("should return 403 when logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );

      await request(app.getHttpServer())
        .patch("/trips/1")
        .send({
          name: "Wycieczka do Wrocławia updejt",
        })
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 401 if no token provided", async () => {
      await request(app.getHttpServer())
        .patch("/trips/1")
        .send({
          name: "Wycieczka do Wrocławia updejt",
        })
        .expect(401);
    });
  });

  //kiedys tu wrocic i dodac delete bo baza nie dziala a nie chce mi sie naprawiac (constrainty, P2003)
});
