import { AppModule } from "src/app.module";
import { TripModule } from "src/trip/trip.module";
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase(); // wipe the testing database using special script
    await seedDatabase(); // add some data to database

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/trip (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Testowa wycieczka",
          start: "2024-03-26T00:00:00.000Z",
          end: "2025-03-26T00:00:00.000Z",
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
