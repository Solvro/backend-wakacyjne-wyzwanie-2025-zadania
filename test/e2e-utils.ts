import { ExpenseCategory } from "@prisma/client";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/auth/auth.guard";
import { RoleGuard } from "../src/auth/roles/role.guard";
import { PrismaService } from "../src/prisma/prisma.service";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface TripTestData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
}

export interface ParticipantTestData {
  name?: string;
  email?: string;
  phone?: string;
  isOrganizer?: boolean;
}

export interface ExpenseTestData {
  title?: string;
  description?: string;
  amount?: number;
  category?: ExpenseCategory;
  date?: string;
}

export interface UserTestData {
  email?: string;
  password?: string;
  roles?: string;
}

// =============================================================================
// E2E TEST SUITE UTILITIES
// =============================================================================

/**
 * Main test suite class that handles NestJS application setup, database cleanup,
 * and provides utilities for making HTTP requests in e2e tests.
 */

export class E2ETestSuite {
  app: INestApplication;
  prisma: PrismaService;

  async setup(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    this.app = moduleFixture.createNestApplication();
    this.prisma = this.app.get<PrismaService>(PrismaService);

    // Enable global validation pipe to match production setup
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );

    await this.app.init();
    // Clean database after initialization to ensure clean state
    await this.cleanDatabase();
  }

  async cleanup(): Promise<void> {
    await this.cleanDatabase();
    await this.prisma.$disconnect();
    await this.app.close();
  }

  async cleanDatabase(): Promise<void> {
    try {
      // Use transaction to ensure atomicity and avoid foreign key issues
      await this.prisma.$transaction(async (tx) => {
        // Clean in correct order due to foreign key constraints
        await tx.expense.deleteMany();
        await tx.participant.deleteMany();
        await tx.trip.deleteMany();
        await tx.user.deleteMany();
      });
    } catch (error) {
      // If transaction fails, try to clean one by one
      console.warn(
        "Transaction cleanup failed, trying individual cleanup:",
        error,
      );
      try {
        await this.prisma.expense.deleteMany();
      } catch {
        /* ignore */
      }
      try {
        await this.prisma.participant.deleteMany();
      } catch {
        /* ignore */
      }
      try {
        await this.prisma.trip.deleteMany();
      } catch {
        /* ignore */
      }
      try {
        await this.prisma.user.deleteMany();
      } catch {
        /* ignore */
      }
    }
  }

  request() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(this.app.getHttpServer());
  }
}

// =============================================================================
// E2E DATA HELPER UTILITIES
// =============================================================================

/**
 * Helper class for creating test data in the database.
 * Provides convenient methods for creating trips, participants, expenses, and users
 * with sensible defaults for testing scenarios.
 */

export class E2EDataHelper {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a trip with the provided data or sensible defaults.
   * @param data Optional trip data overrides
   * @returns Promise resolving to the created trip
   */
  async createTrip(data?: TripTestData) {
    return this.prisma.trip.create({
      data: {
        name: data?.name ?? `Test Trip ${String(Date.now())}`,
        description: data?.description ?? "A test trip description",
        startDate: new Date(data?.startDate ?? "2025-12-01"),
        endDate: new Date(data?.endDate ?? "2025-12-15"),
        budget: data?.budget ?? 150_000,
      },
    });
  }

  /**
   * Creates a participant for the specified trip.
   * @param tripId ID of the trip to add the participant to
   * @param data Optional participant data overrides
   * @returns Promise resolving to the created participant
   */
  async createParticipant(tripId: number, data?: ParticipantTestData) {
    return this.prisma.participant.create({
      data: {
        name: data?.name ?? `Participant ${String(Date.now())}`,
        email: data?.email ?? `participant-${String(Date.now())}@example.com`,
        phone: data?.phone ?? "+48123456789",
        isOrganizer: data?.isOrganizer ?? false,
        tripId,
      },
    });
  }

  /**
   * Creates an expense for the specified trip and participant.
   * @param tripId ID of the trip
   * @param participantId ID of the participant who made the expense
   * @param data Optional expense data overrides
   * @returns Promise resolving to the created expense
   */
  async createExpense(
    tripId: number,
    participantId: number,
    data?: ExpenseTestData,
  ) {
    return this.prisma.expense.create({
      data: {
        title: data?.title ?? `Test expense ${String(Date.now())}`,
        description: data?.description ?? "Test expense description",
        amount: data?.amount ?? 25_000,
        category: data?.category ?? ExpenseCategory.ACCOMMODATION,
        date: new Date(data?.date ?? "2025-12-05"),
        tripId,
        participantId,
      },
    });
  }

  /**
   * Creates a user with the provided data or defaults.
   * @param data Optional user data overrides
   * @returns Promise resolving to the created user
   */
  async createUser(data?: UserTestData) {
    return this.prisma.user.create({
      data: {
        email: data?.email ?? `user-${String(Date.now())}@example.com`,
        password: data?.password ?? "password123",
        roles: data?.roles ?? "USER",
      },
    });
  }
}

// =============================================================================
// E2E TEST DATA FACTORY
// =============================================================================

/**
 * Static test data factory providing predefined data objects for various test scenarios.
 * These objects can be used directly in API requests or with the E2EDataHelper methods.
 *
 * Note: All dates are set to future dates (December 2025) to pass @IsFutureDate validation.
 * Current date context: September 7, 2025
 */

export const e2eTestDataFactory = {
  trip: {
    valid: {
      name: "Test Trip",
      description: "A test trip description",
      startDate: "2025-12-01",
      endDate: "2025-12-15",
      budget: 150_000,
    },
    minimal: {
      name: "Minimal Trip",
      startDate: "2025-11-01",
      endDate: "2025-11-10",
    },
    update: {
      name: "Updated Trip Name",
      description: "Updated description",
      status: "ACTIVE" as const,
      startDate: "2025-12-01",
      endDate: "2025-12-20",
      budget: 200_000,
    },
  },
  participant: {
    valid: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+48123456789",
      isOrganizer: false,
    },
    organizer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+48987654321",
      isOrganizer: true,
    },
    update: {
      name: "John Updated",
      email: "john.updated@example.com",
      phone: "+48111222333",
      isOrganizer: true,
    },
  },
  expense: {
    valid: {
      title: "Hotel Accommodation",
      description: "3 nights at Grand Hotel",
      amount: 25_000,
      category: "ACCOMMODATION" as const,
      date: "2025-12-05",
      participantId: 1,
    },
    transport: {
      title: "Flight Tickets",
      description: "Round trip flights",
      amount: 50_000,
      category: "TRANSPORT" as const,
      date: "2025-12-01",
      participantId: 1,
    },
    update: {
      title: "Updated Hotel",
      description: "Updated description",
      amount: 30_000,
      category: "ACCOMMODATION" as const,
      date: "2025-12-06",
      participantId: 1,
    },
  },
  user: {
    valid: {
      email: "test@example.com",
      password: "password123",
      roles: "USER",
    },
    admin: {
      email: "admin@example.com",
      password: "admin123",
      roles: "ADMIN",
    },
  },
};
