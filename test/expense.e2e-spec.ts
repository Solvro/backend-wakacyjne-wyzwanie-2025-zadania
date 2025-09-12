import { Category, Role } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthModule } from "src/auth/auth.module";
import { RequestWithParticipant } from "src/auth/dto/request-with-participant.dto";
import { RoleGuard } from "src/auth/roles/roles.guard";
import { ExpenseModule } from "src/expense/expense.module";
import request from "supertest";
import { App } from "supertest/types";

import {
  ExecutionContext,
  INestApplication,
  Injectable,
  ValidationPipe,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { cleanDatabases } from "./clean-database";
import { seedDatabase } from "./seed-database";

@Injectable()
class MockAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //dobra tutaj sie wspomogłem kolegą gpt ale już wiem jak to działa
    const request_ = context
      .switchToHttp()
      .getRequest<RequestWithParticipant>();
    request_.participant = {
      participant_id: 1,
      email: "janusz@example.com",
      role: Role.Admin,
    };
    await Promise.resolve();
    return true;
  }
}

@Injectable()
class MockRoleGuard extends RoleGuard {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule, AuthModule],
    })
      .overrideGuard(RoleGuard)
      .useClass(MockRoleGuard)
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
  });

  it("/expenses (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expenses")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Bilet PKP",
          category: "Transport",
          amount: "21.37",
          date: "2025-08-13T00:00:00.000Z",
        }),
      ]),
    );
  });

  it("/expenses (POST)", async () => {
    return request(app.getHttpServer())
      .post("/expenses")
      .send({
        title: "Wydatek testowy",
        category: Category.Jedzenie,
        amount: 200,
        date: "2025-08-13T00:00:00.000Z",
        trip_id: 1,
      })
      .expect(201);
  });

  it("/expenses (PATCH)", async () => {
    const response = await request(app.getHttpServer())
      .patch("/expenses/1")
      .send({
        title: "Wydatek updejt",
      })
      .expect(200);

    expect(response.body).toEqual({
      expense_id: 1,
      title: "Wydatek updejt",
      category: "Transport",
      amount: "21.37",
      date: "2025-08-13T00:00:00.000Z",
      participant_id: 1,
      trip_id: 1,
    });
  });

  it("/expenses/:id (DELETE)", async () => {
    const response = await request(app.getHttpServer())
      .delete(`/expenses/1`)
      .expect(200);

    expect(response.body).toEqual({
      expense_id: 1,
      title: "Bilet PKP",
      category: Category.Transport,
      amount: "21.37",
      date: "2025-08-13T00:00:00.000Z",
      participant_id: 1,
      trip_id: 1,
    });
  });

  it("/expenses (POST) validation", async () => {
    return request(app.getHttpServer())
      .post("/expenses")
      .send({
        title: "Wydatek testowy",
        category: Category.Jedzenie,
        amount: 200,
        date: "2999-01-01T00:00:00.000Z",
        trip_id: 1,
      })
      .expect(400);
  });
});
