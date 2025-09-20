/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExpenseCategory } from "@prisma/client";
import type { Expense } from "@prisma/client";

import { HttpStatus } from "@nestjs/common";

import { E2EDataHelper, E2ETestSuite } from "./e2e-utils";

describe("Expenses Business Logic (e2e)", () => {
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

  describe("Category handling", () => {
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
  });

  describe("Participant-expense relationships", () => {
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

    it("should allow multiple expenses per participant", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);

      const expense1 = await dataHelper.createExpense(trip.id, participant.id, {
        title: "Hotel",
        category: ExpenseCategory.ACCOMMODATION,
        amount: 20_000,
      });

      const expense2 = await dataHelper.createExpense(trip.id, participant.id, {
        title: "Dinner",
        category: ExpenseCategory.FOOD,
        amount: 5000,
      });

      const expense3 = await dataHelper.createExpense(trip.id, participant.id, {
        title: "Concert Tickets",
        category: ExpenseCategory.ENTERTAINMENT,
        amount: 15_000,
      });

      // Get participant with all their expenses
      const participantWithExpenses =
        await testSuite.prisma.participant.findUnique({
          where: { id: participant.id },
          include: { expenses: true },
        });

      expect(participantWithExpenses?.expenses).toHaveLength(3);

      const expenseIds =
        participantWithExpenses?.expenses.map((expense) => expense.id) ?? [];
      expect(expenseIds).toContain(expense1.id);
      expect(expenseIds).toContain(expense2.id);
      expect(expenseIds).toContain(expense3.id);
    });
  });

  describe("Trip-expense relationships", () => {
    it("should isolate expenses between different trips", async () => {
      const trip1 = await dataHelper.createTrip();
      const trip2 = await dataHelper.createTrip({
        name: "Second Trip",
        description: "Another travel adventure",
      });

      const participant1 = await dataHelper.createParticipant(trip1.id);
      const participant2 = await dataHelper.createParticipant(trip2.id);

      const expense1 = await dataHelper.createExpense(
        trip1.id,
        participant1.id,
      );
      const expense2 = await dataHelper.createExpense(
        trip2.id,
        participant2.id,
      );

      // Check trip1 expenses
      const trip1Response = await testSuite
        .request()
        .get(`/trips/${String(trip1.id)}/expenses`)
        .expect(HttpStatus.OK);

      expect(trip1Response.body).toHaveLength(1);
      expect(trip1Response.body[0].id).toBe(expense1.id);

      // Check trip2 expenses
      const trip2Response = await testSuite
        .request()
        .get(`/trips/${String(trip2.id)}/expenses`)
        .expect(HttpStatus.OK);

      expect(trip2Response.body).toHaveLength(1);
      expect(trip2Response.body[0].id).toBe(expense2.id);
    });
  });
});
