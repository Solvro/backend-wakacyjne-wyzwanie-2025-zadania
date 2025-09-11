import request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { UserModule } from "../src/user/user.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("Participants E2E", () => {
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

  it("GET /participant - powinno zwrócić uczestników", async () => {
    return request(app.getHttpServer()).get("/participant").expect(200);
  });

  it("POST /participant - powinno dodać uczestnika", async () => {
    return request(app.getHttpServer())
      .post("/participant")
      .send({ name: "Alice", trip_id: 1, email: "alice.test@example.com" })
      .expect(201);
  });

  it("GET /participant/:id - powinno zwrócić uczestnika", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/participant")
      .send({ name: "Test User", trip_id: 1, email: "test.get@example.com" })
      .expect(201);

    const participantId = createResponse.body.id;

    return request(app.getHttpServer())
      .get(`/participant/${participantId}`)
      .expect(200);
  });

  it("PATCH /participant/:id - powinno zaktualizować uczestnika", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/participant")
      .send({ name: "Test User", trip_id: 1, email: "test.update@example.com" })
      .expect(201);

    const participantId = createResponse.body.id;

    return request(app.getHttpServer())
      .patch(`/participant/${participantId}`)
      .send({ name: "Alice Updated" })
      .expect(200);
  });

  it("DELETE /participant/:id - powinno usunąć uczestnika", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/participant")
      .send({
        name: "Test User",
        trip_id: 1,
        email: "test.to.delete@example.com",
      })
      .expect(201);

    const participantId = createResponse.body.id;

    return request(app.getHttpServer())
      .delete(`/participant/${participantId}`)
      .expect(204);
  });
});
