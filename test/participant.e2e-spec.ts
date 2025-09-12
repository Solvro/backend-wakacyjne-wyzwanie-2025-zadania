import { PrismaClient, Role } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthModule } from "src/auth/auth.module";
import { RoleGuard } from "src/auth/roles/roles.guard";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { ExecutionContext, Injectable } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ParticipantModule } from "../src/participant/participant.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

const prisma = new PrismaClient();

@Injectable()
class MockAuthGuard extends AuthGuard {
  async canActivate(_context: ExecutionContext): Promise<boolean> {
    await Promise.resolve();
    return true;
  }
}

class MockRoleGuard extends RoleGuard {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule, AuthModule],
    })
      .overrideGuard(RoleGuard)
      .useClass(MockRoleGuard)
      .overrideGuard(AuthGuard)
      .useValue(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/participants (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participants")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Janusz",
          email: "janusz@example.com",
          password: "Sigma admin 123",
          role: Role.Admin,
          isEnabled: true,
        }),
      ]),
    );
  });

  it("/participants (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/participants")
      .send({
        name: "Janusz2",
        email: "janusz2@example.com",
        password: "123",
        role: Role.Participant,
        isEnabled: true,
      })
      .expect(201);

    expect(response.body).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      participant_id: expect.any(Number),
      name: "Janusz2",
      email: "janusz2@example.com",
      password: "123",
      role: Role.Participant,
      isEnabled: true,
    });
  });

  it("/participants/:id (DELETE)", async () => {
    const id = await prisma.participant.findFirst({
      where: { email: "janusz@example.com" },
    });

    //nie wiem o co mu chodzi tutaj xddd bo wydaje sie git
    const response = await request(app.getHttpServer())
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .delete(`/participants/${id?.participant_id}`)
      .expect(200);

    expect(response.body).toEqual({
      participant_id: id?.participant_id,
      name: "Janusz",
      email: "janusz@example.com",
      password: "Sigma admin 123",
      role: Role.Admin,
      isEnabled: true,
    });

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await request(app.getHttpServer())
      .get(`/participants/${id?.participant_id}`)
      .expect(404);
  });

  it("/participants (POST)", () => {
    return request(app.getHttpServer())
      .post("/participants")
      .send({
        name: "Janusz",
        password: "Sigma admin 123",
        role: Role.Admin,
        isEnabled: true,
      })
      .expect(400);
  });
});
