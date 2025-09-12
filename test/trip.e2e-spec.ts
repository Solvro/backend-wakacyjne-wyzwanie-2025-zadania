import { PrismaClient } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthModule } from "src/auth/auth.module";
import { RoleGuard } from "src/auth/roles/roles.guard";
import { TripModule } from "src/trip/trip.module";
import request from "supertest";
import { App } from "supertest/types";

import { ExecutionContext, INestApplication, Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

const prisma = new PrismaClient();

@Injectable()
class MockAuthGuard extends AuthGuard {
  async canActivate(_context: ExecutionContext): Promise<boolean> {
    await Promise.resolve();
    return true;
  }
}

class MockRoleGuard extends RoleGuard {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}

describe("TripController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripModule, AppModule, AuthModule],
    })
      .overrideGuard(RoleGuard)
      .useValue(MockRoleGuard)
      .overrideGuard(AuthGuard)
      .useValue(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/trips (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/trips")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Wycieczka do Wrocławia",
          date_start: "2025-08-13T00:00:00.000Z",
          date_end: "2025-08-14T00:00:00.000Z",
          description: "wycieczka na politechnike",
        }),
      ]),
    );
  });

  it("/trips (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/trips")
      .send({
        name: "Wycieczka 1",
        date_start: "2025-09-09T00:00:00Z",
        date_end: "2025-09-10T00:00:00Z",
        description: "Super fajowa wycieczka 1",
      })
      .expect(201);

    expect(response.body).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      trip_id: expect.any(Number),
      name: "Wycieczka 1",
      date_start: "2025-09-09T00:00:00.000Z",
      date_end: "2025-09-10T00:00:00.000Z",
      description: "Super fajowa wycieczka 1",
    });
  });

  it("/trips/:id (DELETE)", async () => {
    const id = await prisma.trip.findFirst({
      where: { name: "Wycieczka do Wrocławia" },
    });
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await request(app.getHttpServer())
      .delete(`/trips/${id?.trip_id}`)
      .expect(200);

    expect(response.body).toEqual({
      trip_id: id?.trip_id,
      name: "Wycieczka do Wrocławia",
      date_end: "2025-08-14T00:00:00.000Z",
      date_start: "2025-08-13T00:00:00.000Z",
      description: "wycieczka na politechnike",
    });

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await request(app.getHttpServer()).get(`/trips/${id?.trip_id}`).expect(404);
  });
});
