import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Participants (e2e)", () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
      }),
    );
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    try {
      await prisma.expense.deleteMany();
      await prisma.trip.deleteMany();
      await prisma.user.deleteMany();
    } catch (error) {
      console.warn("Warning: Initial cleanup failed:", error);
    }
  });

  afterAll(async () => {
    try {
      await prisma.expense.deleteMany();
      await prisma.trip.deleteMany();
      await prisma.user.deleteMany();
    } catch (error) {
      console.warn("Warning: Database cleanup failed:", error);
    }
    await app.close();
  });

  describe("/participants (GET)", () => {
    it("should return empty array when no participants", () => {
      return request(app.getHttpServer())
        .get("/participants")
        .expect(200)
        .expect([]);
    });
  });

  describe("/participants (POST)", () => {
    it("should create a new participant", () => {
      const participantData = {
        name: "Test Participant",
        email: "participant@test.com",
        password: "password123",
      };

      return request(app.getHttpServer())
        .post("/participants")
        .send(participantData)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("id");
          expect(response.body).toHaveProperty("name", "Test Participant");
          expect(response.body).toHaveProperty("email", "participant@test.com");
        });
    });
  });

  describe("/participants/:id (GET)", () => {
    it("should return participant by id", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User Participants",
          email: "testparticipants-get@test.com",
          password: "password123",
        },
      });

      return request(app.getHttpServer())
        .get(`/participants/${user.id.toString()}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", user.id);
          expect(response.body).toHaveProperty(
            "name",
            "Test User Participants",
          );
          expect(response.body).toHaveProperty(
            "email",
            "testparticipants-get@test.com",
          );
        });
    });
  });

  describe("/participants/:id (PATCH)", () => {
    it("should update a participant", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Update User",
          email: "updateuser@test.com",
          password: "password123",
        },
      });

      const updateData = {
        name: "Updated User",
      };

      return request(app.getHttpServer())
        .patch(`/participants/${user.id.toString()}`)
        .send(updateData)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", user.id);
          expect(response.body).toHaveProperty("name", "Updated User");
        });
    });
  });

  describe("/participants/:id (DELETE)", () => {
    it("should delete a participant", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Delete User",
          email: "delete-unique@test.com",
          password: "password123",
        },
      });

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      expect(existingUser).not.toBeNull();

      return request(app.getHttpServer())
        .delete(`/participants/${user.id.toString()}`)
        .expect(200);
    });
  });

  describe("/participants/:id (GET)", () => {
    it("should return participant by id", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User Participants",
          email: "testparticipants@test.com",
          password: "password123",
        },
      });

      return request(app.getHttpServer())
        .get(`/participants/${user.id.toString()}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", user.id);
          expect(response.body).toHaveProperty(
            "name",
            "Test User Participants",
          );
          expect(response.body).toHaveProperty(
            "email",
            "testparticipants@test.com",
          );
        });
    });
  });

  describe("/participants/:id (PATCH)", () => {
    it("should update a participant", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Update User",
          email: "update@test.com",
          password: "password123",
        },
      });

      const updateData = {
        name: "Updated User",
      };

      return request(app.getHttpServer())
        .patch(`/participants/${user.id.toString()}`)
        .send(updateData)
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty("id", user.id);
          expect(response.body).toHaveProperty("name", "Updated User");
        });
    });
  });

  describe("/participants/:id (DELETE)", () => {
    it("should delete a participant", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Delete User",
          email: "delete@test.com",
          password: "password123",
        },
      });

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      expect(existingUser).not.toBeNull();

      return request(app.getHttpServer())
        .delete(`/participants/${user.id.toString()}`)
        .expect(200);
    });
  });
});
