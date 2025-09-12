import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import type { App } from "supertest/types";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { DatabaseService } from "../src/database/database.service";
import { ExpenseModule } from "../src/expense/expense.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

let prisma: DatabaseService;
let adminToken: string;

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;

  const adminUser = {
    email: "admin134@example.com",
    password: "admin123dsad",
    role: Role.ADMIN,
    isEnabled: true,
    name: "Admin",
    aboutMe: "None",
  };

  interface LoginResponse {
    token: string;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule],
    }).compile();

    prisma = moduleFixture.get(DatabaseService);
    await cleanDatabase(prisma); // wipe the testing database using special script
    await seedDatabase(prisma); // add some data to database

    app = moduleFixture.createNestApplication();

    const validationOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();

    const salt = 10;
    const hashedPassword = await hash(adminUser.password, salt);

    const admin = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });
    if (admin === null) {
      await prisma.user.create({
        data: { ...adminUser, password: hashedPassword },
      });
    }
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    const body = response.body as LoginResponse;
    adminToken = body.token;
  });

  it("/expense (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          expenseId: 1,
          tripId: 1,
          expenseAmount: 1978,
          expenseDescription: "Hotel",
        }),
        expect.objectContaining({
          expenseId: 2,
          tripId: 1,
          expenseAmount: 120,
          expenseDescription: "Transport",
        }),
      ]),
    );
  });

  it("/expense/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/expense/1")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        expenseId: 1,
        tripId: 1,
        expenseAmount: 1978,
        expenseDescription: "Hotel",
      }),
    );
  });

  it("/expense (POST)", async () => {
    // creating expense with authorization

    return request(app.getHttpServer())
      .post("/expense")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        tripId: 1,
        expenseAmount: 1234,
        expenseDescription: "Test",
      })
      .expect(201)
      .then((expense) => {
        expect(expense.body).toEqual({
          expenseId: 3,
          tripId: 1,
          expenseAmount: 1234,
          expenseDescription: "Test",
        });
      });
  });

  // check for guards
  it("/expense (POST) guard", async () => {
    return request(app.getHttpServer())
      .post("/expense")
      .send({
        tripId: 1,
        expenseAmount: 1234,
        expenseDescription: "Test",
      })
      .expect(401); // without coordinator or admin token its not possible to make a expense
  });

  it("/expense/:id (PATCH)", async () => {
    return request(app.getHttpServer())
      .patch("/expense/2")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        expenseAmount: 5444,
      })
      .expect(200)
      .then((expense) => {
        expect(expense.body).toEqual({
          expenseId: 2,
          tripId: 1,
          expenseAmount: 5444,
          expenseDescription: "Transport",
        });
      });
  });

  it("/expense/:id (DELETE)", async () => {
    const expense = await prisma.expense.create({
      data: {
        tripId: 1,
        expenseAmount: 5444,
        expenseDescription: "Transport",
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/expense/${String(expense.expenseId)}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toEqual({
      expenseId: expense.expenseId,
      tripId: 1,
      expenseAmount: 5444,
      expenseDescription: "Transport",
    });

    // Checking if the expense really was deleted (not found)
    await request(app.getHttpServer())
      .get(`/expense/${String(expense.expenseId)}`)
      .expect(404);
  });
});
