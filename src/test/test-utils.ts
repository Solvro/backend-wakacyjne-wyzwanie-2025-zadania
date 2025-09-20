import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Creates a comprehensive mock of PrismaService with all commonly used methods
 * Each service test can use only the methods it needs
 */
export const createMockPrismaService = () => ({
  trip: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  participant: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  expense: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

/**
 * Creates a mock TripsService for controller tests
 */
export const createMockTripsService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  remove: jest.fn(),
  getTripSummary: jest.fn(),
  getTripParticipants: jest.fn(),
  getTripExpenses: jest.fn(),
});

/**
 * Creates a mock ParticipantsService for controller tests
 */
export const createMockParticipantsService = () => ({
  addParticipantToTrip: jest.fn(),
  updateParticipant: jest.fn(),
  deleteParticipant: jest.fn(),
});

/**
 * Creates a mock ExpensesService for controller tests
 */
export const createMockExpensesService = () => ({
  addExpenseToTrip: jest.fn(),
  updateExpense: jest.fn(),
  deleteExpense: jest.fn(),
});

/**
 * Helper function to create a testing module for service tests
 * @param serviceClass - The service class to test
 * @param mockPrismaService - Optional custom mock, uses default if not provided
 */
export const createServiceTestingModule = async <T>(
  serviceClass: new (...arguments_: unknown[]) => T,
  mockPrismaService = createMockPrismaService(),
): Promise<{
  module: TestingModule;
  service: T;
  mockPrisma: ReturnType<typeof createMockPrismaService>;
}> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      serviceClass,
      {
        provide: PrismaService,
        useValue: mockPrismaService,
      },
    ],
  }).compile();

  const service = module.get<T>(serviceClass);

  return { module, service, mockPrisma: mockPrismaService };
};

/**
 * Helper function to create a testing module for controller tests with authentication bypassed
 * @param controllerClass - The controller class to test
 * @param providers - Array of provider configurations
 */
export const createControllerTestingModule = async <T>(
  controllerClass: new (...arguments_: unknown[]) => T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providers: any[],
): Promise<{ module: TestingModule; controller: T }> => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [controllerClass],
    providers,
  })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .overrideGuard(RoleGuard)
    .useValue({ canActivate: () => true })
    .compile();

  const controller = module.get<T>(controllerClass);

  return { module, controller };
};

/**
 * Clears all mocks in a mock service object
 * @param mockService - Object containing Jest mock functions
 */
export const clearAllMocks = (mockService: Record<string, unknown>) => {
  for (const mockTable of Object.values(mockService)) {
    if (typeof mockTable === "object" && mockTable !== null) {
      for (const mockFunction of Object.values(
        mockTable as Record<string, unknown>,
      )) {
        if (jest.isMockFunction(mockFunction)) {
          mockFunction.mockClear();
        }
      }
    } else if (jest.isMockFunction(mockTable)) {
      mockTable.mockClear();
    }
  }
};

/**
 * Common test data factories
 */
export const testDataFactory = {
  createMockTrip: (overrides = {}) => ({
    id: 1,
    name: "Test Trip",
    description: "A test trip",
    destination: "Test Destination",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-10"),
    budget: 100_000,
    status: "PLANNED" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  createMockParticipant: (overrides = {}) => ({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+48123456789",
    isOrganizer: false,
    tripId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  createMockExpense: (overrides = {}) => ({
    id: 1,
    title: "Test Expense",
    description: "A test expense",
    amount: 10_000,
    category: "FOOD" as const,
    date: new Date("2025-07-05"),
    tripId: 1,
    participantId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  createExpenseDto: (overrides = {}) => ({
    title: "Hotel accommodation",
    description: "3 nights at Grand Hotel",
    amount: 25_000,
    category: "ACCOMMODATION" as const,
    date: "2025-07-05",
    participantId: 1,
    ...overrides,
  }),

  createParticipantDto: (overrides = {}) => ({
    name: "John Doe",
    email: "john@example.com",
    phone: "+48123456789",
    isOrganizer: false,
    ...overrides,
  }),

  createTripDto: (overrides = {}) => ({
    name: "Summer Vacation 2025",
    description: "A wonderful summer vacation to the mountains",
    status: "PLANNED" as const,
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    budget: 150_000,
    ...overrides,
  }),
};
