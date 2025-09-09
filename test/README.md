# E2E Test Utilities

This directory contains end-to-end test utilities and test files for the Budżetownik application.

## Files Overview

### Core Utilities

- **`e2e-utils.ts`** - Main utilities file with test suite setup and data helpers
- **`e2e-test-sequencer.js`** - Jest test sequencer to ensure proper test execution order
- **`jest-e2e.json`** - Jest configuration for e2e tests

### Test Files

- **`database.e2e-spec.ts`** - Database connection and basic functionality tests
- **`trips.e2e-spec.ts`** - Trip CRUD operations and business logic tests
- **`participants.e2e-spec.ts`** - Participant management tests
- **`expenses-crud.e2e-spec.ts`** - Expense CRUD operations (GET, POST, PUT, DELETE)
- **`expenses-business-logic.e2e-spec.ts`** - Expense business logic and relationship tests
- **`expenses.e2e-spec.ts`** - ⚠️ DEPRECATED: Original expense tests (to be removed)

## Usage

### Basic Test Setup

```typescript
import { E2EDataHelper, E2ETestSuite, e2eTestDataFactory } from "./e2e-utils";

describe("My Feature (e2e)", () => {
  let testSuite: E2ETestSuite;
  let dataHelper: E2EDataHelper;

  beforeAll(async () => {
    testSuite = new E2ETestSuite();
    await testSuite.setup();
    dataHelper = new E2EDataHelper(testSuite.prisma);
  });

  afterAll(async () => {
    await testSuite.cleanup();
  });

  beforeEach(async () => {
    await testSuite.cleanDatabase();
  });

  it("should do something", async () => {
    // Create test data
    const trip = await dataHelper.createTrip();

    // Make API request
    const response = await testSuite
      .request()
      .get(`/trips/${trip.id}`)
      .expect(200);

    // Assertions
    expect(response.body.id).toBe(trip.id);
  });
});
```

### Using Data Factory

```typescript
// Use predefined data objects
const tripData = e2eTestDataFactory.trip.valid;
const participantData = e2eTestDataFactory.participant.organizer;

// Or create with helper methods
const trip = await dataHelper.createTrip({
  name: "Custom Trip",
  budget: 200_000,
});
```

## Key Features

### E2ETestSuite

- **App Setup**: Configures NestJS application with validation pipes
- **Auth Bypass**: Automatically overrides auth guards for testing
- **Database Cleanup**: Transaction-based cleanup with fallback
- **HTTP Client**: Provides supertest instance for API calls

### E2EDataHelper

- **Data Creation**: Helper methods for creating test entities
- **Sensible Defaults**: Automatic generation of realistic test data
- **Foreign Key Handling**: Proper relationship management
- **Future Date Support**: Uses valid future dates for validation

### Test Data Factory

- **Predefined Objects**: Ready-to-use data for common scenarios
- **Validation Compliant**: All data passes strict validation rules
- **Extensible**: Easy to add new test data patterns

## Configuration

### Jest Configuration

- **Serial Execution**: Tests run sequentially to avoid database conflicts
- **Custom Sequencer**: Database tests run first for proper setup
- **Module Mapping**: Supports `@/` path aliases

### Database Management

- **Clean State**: Each test starts with a clean database
- **Transaction Safety**: Uses Prisma transactions for atomic cleanup
- **Foreign Key Aware**: Deletes in correct order to avoid constraint violations

## Best Practices

1. **Always clean database**: Use `beforeEach(() => testSuite.cleanDatabase())`
2. **Use data helpers**: Prefer `dataHelper.createX()` over manual creation
3. **Future dates**: Use dates like "2025-12-01" for validation compliance
4. **Specific assertions**: Assert on specific fields rather than entire objects
5. **Cleanup properly**: Always call `testSuite.cleanup()` in `afterAll`
6. **Avoid redundancy**: Each test should have a unique purpose and not duplicate coverage

## Test Organization

### File Structure Improvements

The expense tests have been split into multiple files for better maintainability and readability:

- **`expenses-crud.e2e-spec.ts`**: Contains all basic CRUD operation tests for expenses (GET, POST, PUT, DELETE endpoints)
- **`expenses-business-logic.e2e-spec.ts`**: Contains business logic tests such as category handling, participant-expense relationships, and trip isolation

This separation improves:

- **Readability**: Each file has a clear, focused purpose
- **Maintainability**: Changes to specific functionality are easier to locate and modify
- **Test Organization**: Related tests are grouped together logically
- **Development Speed**: Developers can run specific test suites when working on particular features

### Redundancy Prevention

The test suite has been optimized to remove redundant tests:

- **Cascade deletions** are tested comprehensively in trips.e2e-spec.ts
- **Total expense calculations** are tested in trips summary endpoint tests
- **Relationship validations** are tested in the most relevant domain context

### Coverage Strategy

- **trips.e2e-spec.ts**: Trip CRUD, status management, and cascade behaviors
- **participants.e2e-spec.ts**: Participant management and validation
- **expenses-crud.e2e-spec.ts**: Expense CRUD operations (create, read, update, delete)
- **expenses-business-logic.e2e-spec.ts**: Expense categories, relationships, and business logic
- **database.e2e-spec.ts**: Infrastructure and connection testing

## Troubleshooting

### Common Issues

1. **Foreign Key Violations**: Ensure parent entities are created before children
2. **Validation Errors**: Check that dates are in the future and data matches DTOs
3. **Database Locks**: Use serial execution (`maxWorkers: 1`) in jest config
4. **Test Isolation**: Make sure each test cleans up its data

### Date Validation

Current date is September 7, 2025. Use dates after this for `@IsFutureDate` validation:

- ✅ "2025-12-01" (future)
- ❌ "2025-07-01" (past)
