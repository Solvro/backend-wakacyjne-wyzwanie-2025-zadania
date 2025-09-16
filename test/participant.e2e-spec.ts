import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/roles/role.guard";
import request from "supertest";

import type {
  CanActivate,
  ExecutionContext,
  INestApplication,
} from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

class MockAuthGuard implements CanActivate {
  constructor(private user) {}
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request_ = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    request_.user = this.user;
    return true;
  }
}

describe("ParticipantController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(new MockAuthGuard({ email: "email", role: Role.ADMIN }))
      .overrideGuard(RoleGuard)
      .useValue(new MockAuthGuard({ email: "email", role: Role.ADMIN }))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  beforeEach(async () => {
    await cleanDatabase();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/participant (POST)", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .post("/participant")
      .send({ userEmail: "email", tripId: 1 })
      .expect(201);
  });

  it("/participant (GET) as ADMIN", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).get("/participant").expect(200);
  });

  it("/participant/:id (GET) as owner", async () => {
    app.useGlobalGuards(new MockAuthGuard({ email: "email", role: Role.USER }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).get("/participant/1").expect(200);
  });

  it("/participant/:id (DELETE) as ADMIN", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).delete("/participant/1").expect(204);
  });
});
