import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppController } from "../src/app.controller";
import { AppService } from "../src/app.service";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/wakacyjne/backend/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/wakacyjne/backend")
      .expect(418)
      .expect({
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote: "Dziwne, u mnie działa ;)",
      });
  });
});
