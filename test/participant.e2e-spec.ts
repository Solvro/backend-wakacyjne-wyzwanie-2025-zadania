import { Gender, PrismaClient, Role } from "@prisma/client";
import type { Test } from "supertest";
import request from "supertest";
import type TestAgent from "supertest/lib/agent";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test as NestTest } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

interface ParticipantResponse {
  id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  gender: Gender;
}

describe("ParticipantController (e2e)", () => {
  let app: INestApplication;
  let createdId: number;
  let prisma: PrismaClient;
  let httpRequest: TestAgent<Test>;

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

    await prisma.user.create({
      data: {
        email: "john.doe@example.com",
        password: "hashedPassword123",
        role: Role.USER,
        is_enabled: true,
        name: "John User",
      },
    });

    await prisma.user.create({
      data: {
        email: "jane.doe@example.com",
        password: "hashedPassword123",
        role: Role.USER,
        is_enabled: true,
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

  it("POST /participant → should create a participant", async () => {
    const result = await httpRequest
      .post("/participant")
      .send({
        first_name: "John",
        second_name: "&",
        last_name: "Doe",
        email: "john.doe@example.com",
        gender: Gender.MALE,
      })
      .expect(201);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: expect.any(Number),
      first_name: "John",
      second_name: "&",
      last_name: "Doe",
      email: "john.doe@example.com",
      genser: Gender.MALE,
    });

    createdId = body.id;
  });

  it("GET /participant → should return list with created participant", async () => {
    const result = await httpRequest.get("/participant").expect(200);

    const body: ParticipantResponse[] = result.body;

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
  });

  it("GET /participant/:id → should return single participant", async () => {
    const result = await httpRequest
      .get(`/participant/${String(createdId)}`)
      .expect(200);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      first_name: "John",
      second_name: "&",
      last_name: "Doe",
      email: "john.doe@example.com",
      Gender: Gender.MALE,
    });
  });

  it("PATCH /participant/:id → should update participant", async () => {
    const result = await httpRequest
      .patch(`/participant/${String(createdId)}`)
      .send({
        first_name: "Jane",
        second_name: "&",
        last_name: "Doe",
        email: "jane.doe@example.com",
        gender: Gender.FEMALE,
      })
      .expect(200);

    const body: ParticipantResponse = result.body;

    expect(body).toMatchObject({
      id: createdId,
      first_name: "Jane",
      second_name: "&",
      last_name: "Doe",
      email: "jane.doe@example.com",
      gender: Gender.FEMALE,
    });
  });

  it("DELETE /participant/:id → should delete participant", async () => {
    await httpRequest
      .delete(`/participant/${String(createdId)}`)
      .expect(200);

    await httpRequest
      .get(`/participant/${String(createdId)}`)
      .expect(404);
  });
});
