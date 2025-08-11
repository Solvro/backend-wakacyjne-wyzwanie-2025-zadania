import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

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

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/wakacyjne/backend")
      .expect(418)
      .expect({
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote:
          "Unikwanie wyzwań sprawia, że stoimy w miejscu. Chyba, że chodzi o walkę z Solvro Configiem",
      });
  });
});
