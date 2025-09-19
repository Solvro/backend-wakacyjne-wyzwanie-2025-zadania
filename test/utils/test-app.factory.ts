import { PrismaClient } from "@prisma/client";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { AppModule } from "../../src/app.module";
import { JwtAuthGuard } from "../../src/common/guards/jwt-auth.guard";
import { CurrencyScheduler } from "../../src/currency/currency.scheduler";
import { CURRENCY_SCRAPER } from "../../src/currency/tokens";
import { ParticipantsModule } from "../../src/participants/participants.module";
import { PaymentsModule } from "../../src/payments/payments.module";
import { TripAccessService } from "../../src/trips/trip-access.service";
import { TripsModule } from "../../src/trips/trips.module";
import { MockJwtAuthGuard } from "./mock-jwt.guard";

export async function buildParticipantsApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [ParticipantsModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function buildTripsApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [TripsModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .overrideProvider(TripAccessService)
    .useValue({
      assertCoordinatorOrAdmin: async () => {
        await Promise.resolve();
      },
    })
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function buildApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .overrideProvider(CURRENCY_SCRAPER)
    .useValue({
      scrape: async (_symbols: unknown, _base?: unknown) => {
        await Promise.resolve();
        return [];
      },
    })
    .overrideProvider(CurrencyScheduler)
    .useValue({
      scrapeJob: async () => {
        await Promise.resolve();
      },
    })
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function buildPaymentsApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [PaymentsModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .overrideProvider(CURRENCY_SCRAPER)
    .useValue({
      scrape: async (_symbols: unknown, _base?: unknown) => {
        await Promise.resolve();
        return [];
      },
    })
    .overrideProvider(CurrencyScheduler)
    .useValue({
      scrapeJob: async () => {
        await Promise.resolve();
      },
    })
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function resetDatabase(): Promise<void> {
  const prisma = new PrismaClient();
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Payment", "CurrencyRate", "Expense", "Participant", "Trip"
    RESTART IDENTITY CASCADE;
  `);
  await prisma.$disconnect();
}
