import { PrismaClient } from "@prisma/client";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { JwtAuthGuard } from "../../src/common/guards/jwt-auth.guard";
import { ParticipantsModule } from "../../src/participants/participants.module";
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
    .useValue({ assertCoordinatorOrAdmin: jest.fn() })
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function resetDatabase(): Promise<void> {
  const prisma = new PrismaClient();
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Expense", "Participant", "Trip"
    RESTART IDENTITY CASCADE;
  `);
  await prisma.$disconnect();
}
