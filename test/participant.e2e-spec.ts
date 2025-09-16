/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthGuard } from "src/auth/auth.guard";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { cleanDb as cleanDatabase } from "./clean-db";
import { seedDb as seedDatabase } from "./seed-db";

describe("Participant E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard) // wyłączamy autoryzację
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          // symulujemy zalogowanego admina
          req.user = {
            sub: "john@example.com",
            role: "ADMIN",
          };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /participant - powinno zwrócić listę uczestników", async () => {
    const res = await request(app.getHttpServer())
      .get("/participant")
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /participant/:id - powinno zwrócić jednego uczestnika", async () => {
    const res = await request(app.getHttpServer())
      .get("/participant/1")
      .expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("firstName");
  });

  it("POST /participant - powinno stworzyć nowego uczestnika", async () => {
    const newParticipant = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
    };

    const res = await request(app.getHttpServer())
      .post("/participant")
      .send(newParticipant)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.firstName).toBe("Test");
  });

  it("PUT /participant/:id - powinno zaktualizować uczestnika", async () => {
    const updateData = { lastName: "Nowak" };

    const res = await request(app.getHttpServer())
      .put("/participant/1")
      .send(updateData)
      .expect(200);

    expect(res.body).toHaveProperty("id", 1);
    expect(res.body.lastName).toBe("Nowak");
  });

  it("DELETE /participant/:id - powinno usunąć uczestnika", async () => {
    await request(app.getHttpServer()).delete("/participant/1").expect(200);

    // sprawdzamy czy faktycznie usunięty
    await request(app.getHttpServer()).get("/participant/1").expect(404);
  });
});
