/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExpenseCategory } from "@prisma/client";
import type { Expense } from "@prisma/client";

import { HttpStatus } from "@nestjs/common";

import { E2EDataHelper, E2ETestSuite, e2eTestDataFactory } from "./e2e-utils";

describe("Expenses (e2e)", () => {
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

  describe("GET /trips/:tripId/expenses", () => {
    it("should return empty array when no expenses exist", async () => {
      const trip = await dataHelper.createTrip();

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/expenses`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
    });

    it("should return all expenses for a trip", async () => {
      const trip = await dataHelper.createTrip();
      const participant1 = await dataHelper.createParticipant(trip.id);
      const participant2 = await dataHelper.createParticipant(trip.id, {
        name: "Jane Smith",
        email: "jane@example.com",
      });

      const expense1 = await dataHelper.createExpense(trip.id, participant1.id);
      const expense2 = await dataHelper.createExpense(
        trip.id,
        participant2.id,
        {
          title: "Flight Tickets",
          amount: 50_000,
          category: ExpenseCategory.TRANSPORT,
        },
      );

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/expenses`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        id: expense1.id,
        title: expense1.title,
        description: expense1.description,
        amount: expense1.amount,
        category: expense1.category,
        tripId: trip.id,
        participantId: participant1.id,
      });
      expect(response.body[1]).toMatchObject({
        id: expense2.id,
        title: expense2.title,
        amount: expense2.amount,
        category: expense2.category,
        tripId: trip.id,
        participantId: participant2.id,
      });
    });

    it("should return 404 for non-existent trip", async () => {
      const response = await testSuite
        .request()
        .get("/trips/999/expenses")
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("POST /trips/:tripId/expenses", () => {
    it("should add a new expense to a trip", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const expenseData = {
        ...e2eTestDataFactory.expense.valid,
        participantId: participant.id,
      };

      const response = await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/expenses`)
        .send(expenseData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        title: expenseData.title,
        description: expenseData.description,
        amount: expenseData.amount,
        category: expenseData.category,
        tripId: trip.id,
        participantId: participant.id,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(new Date(response.body.date as string)).toEqual(
        new Date(expenseData.date),
      );

      // Verify in database
      const databaseExpense = await testSuite.prisma.expense.findUnique({
        where: { id: response.body.id },
      });
      expect(databaseExpense).toBeTruthy();
      expect(databaseExpense?.title).toBe(expenseData.title);
      expect(databaseExpense?.tripId).toBe(trip.id);
      expect(databaseExpense?.participantId).toBe(participant.id);
    });

    it("should create expense with all categories", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);

      const categories = [
        ExpenseCategory.ACCOMMODATION,
        ExpenseCategory.TRANSPORT,
        ExpenseCategory.FOOD,
        ExpenseCategory.ENTERTAINMENT,
        ExpenseCategory.OTHER,
      ];

      for (const category of categories) {
        const expenseData = {
          title: `Test ${category} Expense`,
          description: `Description for ${category}`,
          amount: 10_000,
          category,
          date: "2025-12-05",
          participantId: participant.id,
        };

        const response = await testSuite
          .request()
          .post(`/trips/${String(trip.id)}/expenses`)
          .send(expenseData)
          .expect(HttpStatus.CREATED);

        expect(response.body.category).toBe(category);
      }
    });

    it("should return 400 for invalid expense data", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);

      const invalidData = {
        title: "", // Empty title should be invalid
        description: "Valid description",
        amount: -100, // Negative amount should be invalid
        category: "ACCOMMODATION", // Valid category
        date: "2025-07-05", // Valid date format
        participantId: participant.id,
      };

      await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/expenses`)
        .send(invalidData)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 404 for non-existent trip", async () => {
      const expenseData = {
        ...e2eTestDataFactory.expense.valid,
        participantId: 1,
      };

      const response = await testSuite
        .request()
        .post("/trips/999/expenses")
        .send(expenseData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });

    it("should return 404 for non-existent participant", async () => {
      const trip = await dataHelper.createTrip();
      const expenseData = {
        ...e2eTestDataFactory.expense.valid,
        participantId: 999,
      };

      const response = await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/expenses`)
        .send(expenseData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain(
        "Participant with ID 999 not found",
      );
    });
  });

  describe("PUT /trips/:tripId/expenses/:id", () => {
    it("should update an existing expense", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const expense = await dataHelper.createExpense(trip.id, participant.id);

      const updateData = {
        ...e2eTestDataFactory.expense.update,
        participantId: participant.id,
      };

      const response = await testSuite
        .request()
        .put(`/trips/${String(trip.id)}/expenses/${String(expense.id)}`)
        .send(updateData)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: expense.id,
        title: updateData.title,
        description: updateData.description,
        amount: updateData.amount,
        category: updateData.category,
        tripId: trip.id,
        participantId: participant.id,
      });

      // Verify in database
      const databaseExpense = await testSuite.prisma.expense.findUnique({
        where: { id: expense.id },
      });
      expect(databaseExpense?.title).toBe(updateData.title);
      expect(databaseExpense?.amount).toBe(updateData.amount);
      expect(databaseExpense?.category).toBe(updateData.category);
    });

    it("should return 404 for non-existent expense", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const updateData = {
        ...e2eTestDataFactory.expense.update,
        participantId: participant.id,
      };

      const response = await testSuite
        .request()
        .put(`/trips/${String(trip.id)}/expenses/999`)
        .send(updateData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Expense with ID 999 not found");
    });
  });

  describe("DELETE /trips/:tripId/expenses/:id", () => {
    it("should delete an existing expense", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const expense = await dataHelper.createExpense(trip.id, participant.id);

      await testSuite
        .request()
        .delete(`/trips/${String(trip.id)}/expenses/${String(expense.id)}`)
        .expect(HttpStatus.NO_CONTENT);

      // Verify expense is deleted from database
      const databaseExpense = await testSuite.prisma.expense.findUnique({
        where: { id: expense.id },
      });
      expect(databaseExpense).toBeNull();
    });

    it("should return 404 for non-existent expense", async () => {
      const trip = await dataHelper.createTrip();

      const response = await testSuite
        .request()
        .delete(`/trips/${String(trip.id)}/expenses/999`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Expense with ID 999 not found");
    });
  });

  describe("Business logic tests", () => {
    it("should handle expenses with different categories", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);

      const accommodationExpense = await dataHelper.createExpense(
        trip.id,
        participant.id,
        {
          title: "Hotel",
          category: ExpenseCategory.ACCOMMODATION,
          amount: 30_000,
        },
      );

      const transportExpense = await dataHelper.createExpense(
        trip.id,
        participant.id,
        {
          title: "Flight",
          category: ExpenseCategory.TRANSPORT,
          amount: 50_000,
        },
      );

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/expenses`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const accommodationResult = response.body.find(
        (expense: Expense) => expense.id === accommodationExpense.id,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const transportResult = response.body.find(
        (expense: Expense) => expense.id === transportExpense.id,
      );

      expect(accommodationResult.category).toBe(ExpenseCategory.ACCOMMODATION);
      expect(transportResult.category).toBe(ExpenseCategory.TRANSPORT);
    });

    it("should maintain expense-participant relationships correctly", async () => {
      const trip = await dataHelper.createTrip();
      const participant1 = await dataHelper.createParticipant(trip.id, {
        name: "John Doe",
        email: "john@example.com",
      });
      const participant2 = await dataHelper.createParticipant(trip.id, {
        name: "Jane Smith",
        email: "jane@example.com",
      });

      const expense1 = await dataHelper.createExpense(trip.id, participant1.id);
      const expense2 = await dataHelper.createExpense(trip.id, participant2.id);

      // Get participant with their expenses
      const participantWithExpenses =
        await testSuite.prisma.participant.findUnique({
          where: { id: participant1.id },
          include: { expenses: true },
        });

      expect(participantWithExpenses?.expenses).toHaveLength(1);
      expect(participantWithExpenses?.expenses[0]?.id).toBe(expense1.id);

      // Get expense with participant
      const expenseWithParticipant = await testSuite.prisma.expense.findUnique({
        where: { id: expense2.id },
        include: { participant: true },
      });

      expect(expenseWithParticipant?.participant.id).toBe(participant2.id);
      expect(expenseWithParticipant?.participant.name).toBe("Jane Smith");
    });
  });
});
