import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { PrismaService } from "../src/prisma/prisma.service";

describe("Database Connection (e2e)", () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should connect to database", async () => {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    expect(result).toBeDefined();
  }, 10_000); // 10 second timeout

  it("should be able to query trips table", async () => {
    const trips = await prisma.trip.findMany();
    expect(Array.isArray(trips)).toBe(true);
  }, 10_000);
});
