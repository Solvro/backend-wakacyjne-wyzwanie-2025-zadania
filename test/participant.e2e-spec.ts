/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */
import { AuthRole, PrismaClient, Role } from "@prisma/client";
import type { SuperTest, Test } from "supertest";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test as NestTest } from "@nestjs/testing";

import { AppModule } from "../src/app/app.module";

interface ParticipantResponse {
  id: number;
  name: string;
  email: string;
  role: Role;
}

describe("ParticipantController (e2e)", () => {
  let app: INestApplication;
  let createdId: number;
  let prisma: PrismaClient;
  let httpRequest: SuperTest<Test>;

  beforeAll(async () => {
    const moduleFixture = await NestTest.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );
    await app.init();

    prisma = new PrismaClient();
    httpRequest = request(app.getHttpServer());

    // cleanup
    await prisma.participant.deleteMany({
      where: {
        email: { in: ["john.doe@example.com", "jane.doe@example.com"] },
      },
    });
    await prisma.user.deleteMany({
      where: {
        email: { in: ["john.doe@example.com", "jane.doe@example.com"] },
      },
    });

    // seed users
    await prisma.user.create({
      data: {
        email: "john.doe@example.com",
        password: "hashedPassword123",
        role: AuthRole.USER,
        isEnabled: true,
        name: "John User",
      },
    });

    await prisma.user.create({
      data: {
        email: "jane.doe@example.com",
        password: "hashedPassword123",
        role: AuthRole.USER,
        isEnabled: true,
        name: "Jane User",
      },
    });
  });

  afterAll(async () => {
    await prisma.participant.deleteMany({
      where: {
        email: { in: ["john.doe@example.com", "jane.doe@example.com"] },
      },
    });
    await prisma.user.deleteMany({
      where: {
        email: { in: ["john.doe@example.com", "jane.doe@example.com"] },
      },
    });

    await prisma.$disconnect();
    await app.close();
  });

  it("POST /api/v1/participants → should create a participant", async () => {
    const result = await httpRequest
      .post("/api/v1/participants")
      .send({
        name: "John Doe",
        email: "john.doe@example.com",
        role: Role.PARTICIPANT,
      })
      .expect(201);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: expect.any(Number),
      name: "John Doe",
      email: "john.doe@example.com",
      role: Role.PARTICIPANT,
    });

    createdId = body.id;
  });

  it("GET /api/v1/participants → should return list with created participant", async () => {
    const result = await httpRequest.get("/api/v1/participants").expect(200);

    const body: ParticipantResponse[] = result.body;

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
  });

  it("GET /api/v1/participants/:id → should return single participant", async () => {
    const result = await httpRequest
      .get(`/api/v1/participants/${String(createdId)}`)
      .expect(200);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      name: "John Doe",
      email: "john.doe@example.com",
      role: Role.PARTICIPANT,
    });
  });

  it("PATCH /api/v1/participants/:id → should update participant", async () => {
    const result = await httpRequest
      .patch(`/api/v1/participants/${String(createdId)}`)
      .send({
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: Role.GUIDE,
      })
      .expect(200);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: Role.GUIDE,
    });
  });

  it("DELETE /api/v1/participants/:id → should delete participant", async () => {
    await httpRequest
      .delete(`/api/v1/participants/${String(createdId)}`)
      .expect(200);

    await httpRequest
      .get(`/api/v1/participants/${String(createdId)}`)
      .expect(404);
  });
});
