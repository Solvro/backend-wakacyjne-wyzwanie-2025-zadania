import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { seedDatabase } from "../prisma/seeds";
import { AppModule } from "./../src/app.module";
import { cleanDatabases } from "./clean-database";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    expect(app.getHttpServer()).toBeDefined();
  });
});
