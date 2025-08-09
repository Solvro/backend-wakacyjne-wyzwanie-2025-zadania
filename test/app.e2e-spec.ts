import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

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
    return request(app.getHttpServer())
      .get("/wakacyjne/backend")
      .expect(418)
      .expect({
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote: "Kokodżambo i do przodu!",
      });
  });
});
