import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import type { LoginResponseDto } from "../src/auth/dto/login-response.dto.js";
import { TasksService } from "../src/currency/tasks/tasks.service";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("AuthGuard (e2e)", () => {
  let app: INestApplication<App>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TasksService)
      .useValue({ handleCron: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await cleanDatabase();
    await seedDatabase();

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "superuser@example.com",
        password: "password",
      });

    const body = loginResponse.body as LoginResponseDto;
    token = body.accessToken;
  });
  afterAll(async () => {
    await app.close();
  });

  it("should allow access if user is valid", async () => {
    await request(app.getHttpServer())
      .get("/user/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should reject request without token", async () => {
    await request(app.getHttpServer()).get("/user/me").expect(401);
  });
});
