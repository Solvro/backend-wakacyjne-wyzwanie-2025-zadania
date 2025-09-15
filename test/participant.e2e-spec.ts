import type { LoginResponseDto } from "src/auth/dto/login-response.dto";
import type { CreateParticipantDto } from "src/participant/dto/create-participant.dto";
import type { ParticipantResponseDto } from "src/participant/dto/participant-response.dto";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthModule } from "../src/auth/auth.module";
import { ParticipantModule } from "../src/participant/participant.module";
import { seedDatabase } from "./seed-database";

//import { log } from "node:console";

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;
  let adminToken: string;
  let coordinatorToken: string;
  let userToken: string;

  beforeEach(async () => {
    await seedDatabase();
    //log("Database seeded");

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const adminLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "admin123" });
    adminToken = adminLoginResponse.body.token;

    const coordinatorLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "coordinator@example.com", password: "coordinator123" });
    coordinatorToken = coordinatorLoginResponse.body.token;

    const userLoginResponse: { body: LoginResponseDto } = await request(
      app.getHttpServer(),
    )
      .post("/auth/login")
      .send({ email: "user@example.com", password: "user123" });
    userToken = userLoginResponse.body.token;
  });

  describe("GET /participant", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).get("/participant").expect(401);
    });

    it("should return 200 and a list of participants with a valid token", () => {
      return request(app.getHttpServer())
        .get("/participant")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toBeInstanceOf(Array);
          expect(
            (response.body as ParticipantResponseDto[]).length,
          ).toBeGreaterThan(0);
        });
    });
  });

  describe("POST /participant", () => {
    const createDto: CreateParticipantDto = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .post("/participant")
        .send(createDto)
        .expect(401);
    });

    it("should create a participant for a USER and return 201", () => {
      return request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${userToken}`)
        .send(createDto)
        .expect(201)
        .expect((response) => {
          //log(response.body);
          expect(response.body).toHaveProperty("participant_id");
          expect(response.body).toHaveProperty(
            "first_name",
            createDto.firstName,
          );
        });
    });

    it("should create a participant for an ADMIN", () => {
      return request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          firstName: createDto.firstName,
          lastName: createDto.lastName,
          email: "admin.made@example.com",
        })
        .expect(201);
    });

    it("should create a participant for a COORDINATOR", () => {
      return request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send({
          firstName: createDto.firstName,
          lastName: createDto.lastName,
          email: "coord.made@example.com",
        })
        .expect(201);
    });
  });

  describe("GET /participant/:id", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).get("/participant/1").expect(401);
    });

    it("should return 200 with a valid ID", () => {
      //log(adminToken);
      return request(app.getHttpServer())
        .get("/participant/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("participant_id", 1);
        });
    });

    it("should return 404 for an invalid ID", () => {
      return request(app.getHttpServer())
        .get("/participant/9999")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe("PATCH /participant/:id", () => {
    const updateDto = { firstName: "Updated", lastName: "Name" };

    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer())
        .patch("/participant/1")
        .send(updateDto)
        .expect(401);
    });

    it("should update a participant for ADMIN", () => {
      //log(adminToken);
      return request(app.getHttpServer())
        .patch("/participant/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty(
            "first_name",
            updateDto.firstName,
          );
        });
    });

    it("should let USER update their own participant", async () => {
      //log(userToken);
      const createResponse = await request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          firstName: "User",
          lastName: "Owned",
          email: "owned@example.com",
        })
        .expect(201);

      const id = (createResponse.body as ParticipantResponseDto).participant_id;

      await request(app.getHttpServer())
        .patch(`/participant/${id.toString()}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateDto)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty(
            "first_name",
            updateDto.firstName,
          );
        });
    });

    it("should return 403 if USER tries to update someone else’s participant", () => {
      return request(app.getHttpServer())
        .patch("/participant/2")
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateDto)
        .expect(403);
    });

    it("should return 404 if participant does not exist", () => {
      return request(app.getHttpServer())
        .patch("/participant/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(404);
    });
  });

  describe("DELETE /participant/:id", () => {
    it("should return 401 Unauthorized without a token", () => {
      return request(app.getHttpServer()).delete("/participant/1").expect(401);
    });

    it("should delete a participant for ADMIN", async () => {
      await request(app.getHttpServer())
        .delete("/participant/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get("/participant/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });

    it("should delete a participant for COORDINATOR", async () => {
      const createResponse = await request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .send({
          firstName: "Temp",
          lastName: "User",
          email: "temp@example.com",
        })
        .expect(201);

      const id = (createResponse.body as ParticipantResponseDto).participant_id;

      await request(app.getHttpServer())
        .delete(`/participant/${id.toString()}`)
        .set("Authorization", `Bearer ${coordinatorToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/participant/${id.toString()}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });

    it("should let USER delete their own participant", async () => {
      const createResponse = await request(app.getHttpServer())
        .post("/participant")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          firstName: "Self",
          lastName: "Delete",
          email: "self@example.com",
        })
        .expect(201);

      const id = (createResponse.body as ParticipantResponseDto).participant_id;

      await request(app.getHttpServer())
        .delete(`/participant/${id.toString()}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/participant/${id.toString()}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });

    it("should return 403 if USER tries to delete someone else’s participant", () => {
      return request(app.getHttpServer())
        .delete("/participant/2")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(403);
    });

    it("should return 404 if participant does not exist", () => {
      return request(app.getHttpServer())
        .delete("/participant/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
