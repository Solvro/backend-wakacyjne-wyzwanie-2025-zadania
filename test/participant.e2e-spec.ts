import { AppModule } from "src/app.module";
import { ParticipantModule } from "src/participant/participant.module";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("ParticipantController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase(); // wipe the testing database using special script
    await seedDatabase(); // add some data to database

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ParticipantModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/participant (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Szymon",
          surname: "Stępień",
          age: 30,
          email: "test@example.com",
          //Dodaję te linijke nizej bo w docsach było jako przyklad ze tak ma byc (z .any)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          createdAt: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(Number),
        }),
      ]),
    );
  });
});
