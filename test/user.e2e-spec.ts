/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Role } from "@prisma/client";
import request from "supertest";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseService } from "../src/database/database.service";
import { UserModule } from "../src/user/user.module";
import { AppModule } from "./../src/app.module";
import { authRequest } from "./auth-request";
import { cleanDatabase } from "./clean-database";
import { loginAdmin } from "./login-admin";
import { seedDatabase } from "./seed-database";

let prisma: DatabaseService;
let adminToken: string;
let app: INestApplication;

describe("UserController (e2e)", () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
    }).compile();

    prisma = moduleFixture.get(DatabaseService);
    app = moduleFixture.createNestApplication();

    const validationOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase(prisma); // wipe the testing database using special script
    await seedDatabase(prisma); // add some data to database
    adminToken = await loginAdmin(prisma, app);
  });

  it("/user (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/user")
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: "ala.makota@example.com",
          name: "Ala Makota",
          aboutMe: null,
          role: "ADMIN",
        }),
        expect.objectContaining({
          email: "barka@gmail.com",
          name: "Jan Paweł",
          aboutMe: null,
          role: "COORDINATOR",
        }),
      ]),
    );
  });

  it("/user (POST)", async () => {
    return request(app.getHttpServer())
      .post("/user")
      .send({
        name: "user",
        email: "user1@example.com",
        password: "password",
        role: Role.USER,
        isEnabled: true,
        aboutMe: "i am still here",
      })
      .expect(201)
      .then((user) => {
        expect(user.body).toEqual({
          name: "user",
          email: "user1@example.com",
          password: "password",
          role: Role.USER,
          isEnabled: true,
          aboutMe: "i am still here",
        });
      });
  });

  it("/user/:id (DELETE)", async () => {
    const userEmail = "user1@example.com";

    await prisma.user.create({
      data: {
        name: "Alice",
        email: userEmail,
        role: Role.USER,
        isEnabled: true,
        password: "password",
        aboutMe: "None",
      },
    });

    const response = await authRequest(app.getHttpServer(), adminToken)(
      "delete",
      `/user/${userEmail}`,
    ).expect(200);

    expect(response.body).toEqual({
      name: "Alice",
      email: userEmail,
      role: Role.USER,
      isEnabled: true,
      password: "password",
      aboutMe: "None",
    });

    // Checking if the user really was deleted (empty bracets)
    const result = await request(app.getHttpServer()).get(`/user/${userEmail}`);

    expect(result.body).toEqual({});
  });

  // Here we check if validators work correctly
  it("/user (POST)", () => {
    return request(app.getHttpServer())
      .post("/user")
      .send({
        name: 1, // This is supposed to be a string so it should return error
        email: "first@example.com",
        password: "placeholder",
        isEnabled: false,
        role: Role.USER,
      })
      .expect(400);
  });

  it("/user (POST)", () => {
    return request(app.getHttpServer())
      .post("/user")
      .send({
        name: "Mark", // Email is required so it will also cause an error
      })
      .expect(400);
  });
});
