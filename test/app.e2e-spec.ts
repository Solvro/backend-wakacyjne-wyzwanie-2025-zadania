import type { Server } from "node:http";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("wakacyjne/backend (GET)", () => {
    return request(app.getHttpServer() as Server)
      .get("/wakacyjne/backend")
      .expect(418)
      .expect({
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote: "Kokodżambo i do przodu!",
      });
  });
});
