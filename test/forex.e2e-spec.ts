import type { Server } from "node:http";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

interface ForexRateResponse {
  currencyName: string;
  rate: number;
  fetchedAt: string;
}

interface FetchRatesResponse {
  fetchedCount: number;
  rates: ForexRateResponse[];
  fetchedAt: string;
}

describe("Forex (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let httpServer: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
    httpServer = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    // Clean up test data
    await prismaService.forexRate.deleteMany();
    await prismaService.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up before each test
    await prismaService.forexRate.deleteMany();
  });

  describe("/forex/fetch (POST)", () => {
    it("should fetch and save current currency rates", async () => {
      const response = await request(httpServer)
        .post("/forex/fetch")
        .expect(201);

      const body = response.body as FetchRatesResponse;
      expect(body).toHaveProperty("fetchedCount");
      expect(body).toHaveProperty("rates");
      expect(body).toHaveProperty("fetchedAt");
      expect(body.fetchedCount).toBeGreaterThan(0);
      expect(Array.isArray(body.rates)).toBe(true);
    }, 10_000); // API call timeout
  });

  describe("/forex/latest (GET)", () => {
    it("should return empty array when no rates exist", async () => {
      const response = await request(httpServer)
        .get("/forex/latest")
        .expect(200);

      const body = response.body as ForexRateResponse[];
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(0);
    });

    it("should return latest rates after fetching", async () => {
      // First, fetch some rates
      await request(httpServer).post("/forex/fetch").expect(201);

      // Then get latest rates
      const response = await request(httpServer)
        .get("/forex/latest")
        .expect(200);

      const body = response.body as ForexRateResponse[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    }, 10_000);
  });

  describe("/forex/history (GET)", () => {
    it("should return empty array when no rates exist", async () => {
      const response = await request(httpServer)
        .get("/forex/history")
        .expect(200);

      const body = response.body as ForexRateResponse[];
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(0);
    });

    it("should return rates history with default limit", async () => {
      // First, fetch some rates
      await request(httpServer).post("/forex/fetch").expect(201);

      const response = await request(httpServer)
        .get("/forex/history")
        .expect(200);

      const body = response.body as ForexRateResponse[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body.length).toBeLessThanOrEqual(10); // Default limit
    }, 10_000);

    it("should filter by currency code", async () => {
      // First, fetch some rates
      await request(httpServer).post("/forex/fetch").expect(201);

      await request(httpServer).get("/forex/history?currency=USD").expect(200);
    }, 10_000);

    it("should return 400 for invalid currency code", async () => {
      await request(httpServer)
        .get("/forex/history?currency=INVALID")
        .expect(400);
    });

    it("should return 400 for invalid limit", async () => {
      await request(httpServer).get("/forex/history?limit=0").expect(400);

      await request(httpServer).get("/forex/history?limit=101").expect(400);
    });
  });
});
