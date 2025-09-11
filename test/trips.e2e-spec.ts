/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { UserModule } from "../src/user/user.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("Trips E2E", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  it("GET /trip - powinno zwrócić listę wycieczek", async () => {
    return request(app.getHttpServer()).get("/trip").expect(200);
  });

  it("POST /trip - powinno utworzyć nową wycieczkę", async () => {
    return request(app.getHttpServer())
      .post("/trip")
      .send({ name: "Summer Trip", location: "Italy", status: "planned" })
      .expect(201);
  });

  it("GET /trip/:id - powinno zwrócić wycieczkę po ID", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/trip")
      .send({
        name: "Test Get Trip",
        location: "Test Location",
        status: "planned",
      })
      .expect(201);

    const tripId = createResponse.body.id;

    return request(app.getHttpServer())
      .get(`/trip/${String(tripId)}`)
      .expect(200);
  });

  it("PATCH /trip/:id - powinno zaktualizować wycieczkę", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/trip")
      .send({
        name: "Test Update Trip",
        location: "Test Location",
        status: "planned",
      })
      .expect(201);

    const tripId = createResponse.body.id;

    return request(app.getHttpServer())
      .patch(`/trip/${String(tripId)}`)
      .send({ name: "Updated Trip Name" })
      .expect(200);
  });

  it("DELETE /trip/:id - powinno usunąć wycieczkę", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/trip")
      .send({
        name: "Test Delete Trip",
        location: "Test Location",
        status: "planned",
      })
      .expect(201);

    const tripId = createResponse.body.id;

    return request(app.getHttpServer())
      .delete(`/trip/${String(tripId)}`)
      .expect(204);
  });
});
