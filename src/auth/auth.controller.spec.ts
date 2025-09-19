import { Role } from "@prisma/client";
import * as request from "supertest";
import type { App } from "supertest/types";

import type { INestApplication } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ExpensesController } from "../expenses/expenses.controller";
import { ExpensesService } from "../expenses/expenses.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let app: INestApplication;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController, ExpensesController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ExpensesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Guards", () => {
    it("should not require guards for login", async () => {
      mockAuthService.login.mockResolvedValueOnce({ token: "token" });
      await request(app.getHttpServer() as App)
        .post("/auth/login")
        .send({ email: "test@mail.com", password: "password" })
        .expect(HttpStatus.CREATED);
    });

    it("should not require guards for register", async () => {
      mockAuthService.register.mockResolvedValueOnce({
        email: "test2@mail.com",
        password: "password",
        name: "Test2",
        role: Role.USER,
      });
      await request(app.getHttpServer() as App)
        .post("/auth/register")
        .send({
          email: "test2@mail.com",
          password: "password",
          name: "Test2",
          role: "USER",
        })
        .expect(HttpStatus.CREATED);
    });

    it("should require guards for protected route", async () => {
      await request(app.getHttpServer() as App)
        .get("/expenses")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
