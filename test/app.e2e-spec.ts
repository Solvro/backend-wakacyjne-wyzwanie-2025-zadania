import * as request from "supertest";
import { App } from "supertest/types";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("wakacyjne/backend (GET)", () => {
    return request(app.getHttpServer())
      .get("wakacyjne/backend")
      .expect(418)
      .expect("Wakacyjne Wyzwanie Solvro!!!");
  });
});
