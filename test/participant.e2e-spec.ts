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
import type { AuthResponse, UserData } from "./test-interfaces";

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

const coordinator = {
  name: "coordinator",
  email: "coordinator@example.com",
  role: Role.Trip_Coordinator,
  isEnabled: true,
};

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule, AuthModule],
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

  describe("/participants (GET)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .get("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(janusz1),
          expect.objectContaining(user),
          expect.objectContaining(coordinator),
        ]),
      );
    });

    it("should return 403 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      await request(app.getHttpServer())
        .get("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 403 if logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      await request(app.getHttpServer())
        .get("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 401 if token not providen", async () => {
      await request(app.getHttpServer()).get("/participants").expect(401);
    });
  });

  describe("/participants (POST)", () => {
    it("should return 201 when logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .post("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(janusz2)
        .expect(201);

      expect(response.body).toMatchObject({
        ...janusz2,
      });
    });

    it("should return 403 when logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      await request(app.getHttpServer())
        .post("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(janusz2)
        .expect(403);
    });

    it("should return 403 when logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      await request(app.getHttpServer())
        .post("/participants")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(janusz2)
        .expect(403);
    });

    it("should return 400 when data is incorrect (missing email)", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
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

    it("should return 401 if token not providen", async () => {
      await request(app.getHttpServer())
        .post("/participants")
        .send(janusz2)
        .expect(401);
    });
  });

  describe("/participants (PATCH)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .patch("/participants/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          name: "janek 123",
        })
        .expect(200);

      expect(response.body).toMatchObject({ ...janusz1, name: "janek 123" });
    });

    it("should return 403 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      await request(app.getHttpServer())
        .patch("/participants/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          name: "janek 123",
        })
        .expect(403);
    });

    it("should return 403 if logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      await request(app.getHttpServer())
        .patch("/participants/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          name: "janek 123",
        })
        .expect(403);
    });

    it("should return 401 if no token is providen", async () => {
      await request(app.getHttpServer())
        .patch("/participants/1")
        .send({
          name: "janek 123",
        })
        .expect(401);
    });
  });

  describe("/participants/:id (DELETE)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
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

    it("should return 403 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      await request(app.getHttpServer())
        .delete(`/participants/2`)
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 403 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      await request(app.getHttpServer())
        .delete(`/participants/2`)
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 401 if no token is providen", async () => {
      await request(app.getHttpServer()).delete(`/participants/2`).expect(401);
    });
  });
});
