import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { TripModule } from "../src/trip/trip.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { generateTestToken, validTrip } from "./test-utils";

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });
  const userToken = generateTestToken(1);
  const adminToken = generateTestToken(2);

  it("/trip (POST) as admin", async () => {
    return request(app.getHttpServer())
      .post("/trip")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(validTrip())
      .expect(201)
      .then((trip) => {
        expect(trip.body).toEqual({
          id: expect.any(Number) as unknown,
          name: "testTrip",
          description: "testDescription",
          begin_date: new Date("2025-08-15").toISOString(),
          end_date: new Date("2025-08-16").toISOString(),
        });
      });
  });

  it("/trip (POST) as user", async () => {
    return request(app.getHttpServer())
      .post("/trip")
      .set("Authorization", `Bearer ${userToken}`)
      .send(validTrip())
      .expect(403);
  });

  it("/trip (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number) as unknown,
        name: "Test trip",
        description: "Example trip",
        begin_date: new Date("2025-09-16").toISOString(),
        end_date: new Date("2025-09-16").toISOString(),
      },
    ]);
  });

  it("/trip/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trip/1")
      .expect(200);
    expect(response.body).toEqual({
      id: expect.any(Number) as unknown,
      name: "Test trip",
      description: "Example trip",
      begin_date: new Date("2025-09-16").toISOString(),
      end_date: new Date("2025-09-16").toISOString(),
    });
  });

  it("/trip/:id (PATCH) as admin", async () => {
    const response = await request(app.getHttpServer())
      .patch("/trip/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        description: "trip description updated",
      })
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(Number) as unknown,
      name: "Test trip",
      description: "trip description updated",
      begin_date: new Date("2025-09-16").toISOString(),
      end_date: new Date("2025-09-16").toISOString(),
    });
  });

  it("/trip/:id (PATCH) as user", async () => {
    return request(app.getHttpServer())
      .patch("/trip/1")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        description: "trip description updated",
      })
      .expect(403);
  });

  it("/trip/:id (DELETE) as admin", async () => {
    const response = await request(app.getHttpServer())
      .delete("/trip/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(Number) as unknown,
      name: "Test trip",
      description: "Example trip",
      begin_date: new Date("2025-09-16").toISOString(),
      end_date: new Date("2025-09-16").toISOString(),
    });
  });

  it("/trip/:id (DELETE) as user", async () => {
    return request(app.getHttpServer())
      .delete("/trip/1")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(403);
  });
});
