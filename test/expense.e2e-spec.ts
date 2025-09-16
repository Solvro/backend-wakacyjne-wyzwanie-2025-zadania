import { Category } from "@prisma/client";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { ExpenseModule } from "src/expense/expense.module";
import request from "supertest";
import type { App } from "supertest/types";

import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { seedDatabase } from "../prisma/seeds";
import { cleanDatabases } from "./clean-database";
import type { AuthResponse, UserData } from "./test-interfaces";

async function getAuthToken(server: App, userData: UserData) {
  const response = await request(server)
    .post("/auth/login")
    .send({
      email: userData.email,
      password: userData.password,
    })
    .expect(200);

  return (response.body as AuthResponse).token;
}

const userData: UserData = {
  email: "user@example.com",
  password: "123",
};

const adminData: UserData = {
  email: "janusz@example.com",
  password: "123",
};

const coordinatorData: UserData = {
  email: "coordinator@example.com",
  password: "123",
};

const bilet = {
  title: "Bilet PKP",
  category: "Transport",
  amount: "21.37",
  date: "2025-08-13T00:00:00.000Z",
};

const wydatek = {
  title: "Wydatek testowy",
  category: Category.Jedzenie,
  amount: 200,
  date: "2025-08-13T00:00:00.000Z",
  trip_id: 1,
};

describe("ExpenseController (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseModule, AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
  });

  beforeEach(async () => {
    await cleanDatabases();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/expenses (GET)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .get("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining(bilet)]),
      );
    });

    it("should return 200 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      const response = await request(app.getHttpServer())
        .get("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining(bilet)]),
      );
    });

    it("should return 200 if logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      const response = await request(app.getHttpServer())
        .get("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining(bilet)]),
      );
    });

    it("should return 401 if token not provided", async () => {
      await request(app.getHttpServer()).get("/expenses").expect(401);
    });
  });

  describe("/expenses (POST)", () => {
    it("should return 201 when logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(wydatek)
        .expect(201);

      expect(response.body).toMatchObject({
        ...wydatek,
        amount: "200",
      });
    });

    it("should return 201 when logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      const response = await request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(wydatek)
        .expect(201);

      expect(response.body).toMatchObject({
        ...wydatek,
        amount: "200",
      });
    });

    it("should return 201 when logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      const response = await request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(wydatek)
        .expect(201);

      expect(response.body).toMatchObject({
        ...wydatek,
        amount: "200",
      });
    });

    it("should return 400 when data is incorrect (missing title)", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      return request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          category: Category.Jedzenie,
          amount: 200,
          date: "2025-08-13T00:00:00.000Z",
          trip_id: 1,
        })
        .expect(400);
    });

    it("should return 400 when date is in the future", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      return request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          title: "Wydatek testowy",
          category: Category.Jedzenie,
          amount: 200,
          date: "2999-01-01T00:00:00.000Z",
          trip_id: 1,
        })
        .expect(400);
    });

    it("should return 401 if token not provided", async () => {
      await request(app.getHttpServer())
        .post("/expenses")
        .send(wydatek)
        .expect(401);
    });
  });

  describe("/expenses (PATCH)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      const response = await request(app.getHttpServer())
        .patch("/expenses/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          title: "Wydatek updejt",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        ...bilet,
        title: "Wydatek updejt",
      });
    });

    it("should return 200 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      const response = await request(app.getHttpServer())
        .patch("/expenses/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          title: "Wydatek updejt",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        ...bilet,
        title: "Wydatek updejt",
      });
    });

    it("should return 200 if logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      const response = await request(app.getHttpServer())
        .patch("/expenses/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send({
          title: "Wydatek updejt",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        ...bilet,
        title: "Wydatek updejt",
      });
    });

    it("should return 401 if no token is provided", async () => {
      await request(app.getHttpServer())
        .patch("/expenses/1")
        .send({
          title: "Wydatek updejt",
        })
        .expect(401);
    });
  });

  describe("/expenses/:id (DELETE)", () => {
    it("should return 200 if logged as admin", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        adminData,
      );
      await request(app.getHttpServer())
        .post("/expenses")
        .set("Authorization", `Bearer ${tokenValue}`)
        .send(wydatek)
        .expect(201);
      const response = await request(app.getHttpServer())
        .delete("/expenses/2")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(200);

      expect(response.body).toMatchObject({
        ...wydatek,
        amount: "200",
      });

      await request(app.getHttpServer())
        .get("/expenses/2")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(404);
    });

    it("should return 403 if logged as coordinator", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        coordinatorData,
      );
      await request(app.getHttpServer())
        .delete("/expenses/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 403 if logged as user", async () => {
      const tokenValue: string = await getAuthToken(
        app.getHttpServer(),
        userData,
      );
      await request(app.getHttpServer())
        .delete("/expenses/1")
        .set("Authorization", `Bearer ${tokenValue}`)
        .expect(403);
    });

    it("should return 401 if no token is provided", async () => {
      await request(app.getHttpServer()).delete("/expenses/1").expect(401);
    });
  });
});
