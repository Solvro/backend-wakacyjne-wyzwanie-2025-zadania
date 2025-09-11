import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";
import request from "supertest";
import type { App } from "supertest/types";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { UserModule } from "../src/user/user.module";
import { AppModule } from "./../src/app.module";
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";

const prisma = new PrismaClient();
let adminToken: string;

describe("UserController (e2e)", () => {
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
    await cleanDatabase(); // wipe the testing database using special script
    await seedDatabase(); // add some data to database

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const validationOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();

    const salt = 10;
    const hashedPassword = await hash(adminUser.password, salt);

    await prisma.user.create({
      data: { ...adminUser, password: hashedPassword },
    });
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: adminUser.email,
        password: adminUser.password,
      });

    const body = response.body as LoginResponse;
    console.warn(body);
    adminToken = body.token;
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

    console.warn(adminToken);
    const response = await request(app.getHttpServer())
      .delete(`/user/${userEmail}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

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

  // it('/user (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/user')
  //     .send({
  //       name: 'Mark', // Email is required so it will also cause an error
  //     })
  //     .expect(400);
  // });
});
