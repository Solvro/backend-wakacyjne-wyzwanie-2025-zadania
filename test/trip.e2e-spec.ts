import { AppModule } from "src/app.module";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/roles/role.guard";
import { TripModule } from "src/trip/trip.module";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

describe("TripController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TripModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  it("/trip (GET)", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .get("/trip")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(Number),
          title: "Trip 1",
          description: "",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          startDate: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          endDate: expect.any(String),
        }),
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(Number),
          title: "Trip 2",
          description: "",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          startDate: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          endDate: expect.any(String),
        }),
      ]),
    );
  });

  it("/trip (POST)", async () => {
    const dto = {
      title: "Trip 3",
      description: "New adventure",
      startDate: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post("/trip")
      .send(dto)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(Number),
        title: "Trip 3",
        description: "New adventure",
      }),
    );
  });

  it("/trip/:id (GET)", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .get("/trip/1")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Trip 1",
        description: "",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        startDate: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        endDate: expect.any(String),
      }),
    );
  });

  it("/trip/:id (PATCH)", async () => {
    const updateDto = {
      title: "Updated Trip 1",
      description: "Updated description",
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .patch("/trip/1")
      .send(updateDto)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Updated Trip 1",
        description: "Updated description",
      }),
    );
  });

  it("/trip/:id (DELETE)", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer()).delete("/trip/2").expect(204);
  });
});
