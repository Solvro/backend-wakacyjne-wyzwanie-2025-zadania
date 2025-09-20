/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TripStatus } from "@prisma/client";

import { HttpStatus } from "@nestjs/common";

import { E2EDataHelper, E2ETestSuite, e2eTestDataFactory } from "./e2e-utils";

describe("Trips (e2e)", () => {
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

  describe("GET /trips", () => {
    it("should return empty array when no trips exist", async () => {
      const response = await testSuite
        .request()
        .get("/trips")
        .expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
    });

    it("should return all trips when they exist", async () => {
      const trip1 = await dataHelper.createTrip();
      const trip2 = await dataHelper.createTrip({
        name: "Second Trip",
      });

      const response = await testSuite
        .request()
        .get("/trips")
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);

      // Sort by ID to ensure consistent ordering since database doesn't guarantee order
      const sortedTrips = (
        response.body as {
          id: number;
          name: string;
          description: string;
          status: string;
          budget: number;
        }[]
      ).sort((a, b) => a.id - b.id);

      expect(sortedTrips[0]).toMatchObject({
        id: trip1.id,
        name: trip1.name,
        description: trip1.description,
        status: trip1.status,
        budget: trip1.budget,
      });
      expect(sortedTrips[1]).toMatchObject({
        id: trip2.id,
        name: trip2.name,
        status: trip2.status,
      });
    });
  });

  describe("GET /trips/:id", () => {
    it("should return trip by id", async () => {
      const trip = await dataHelper.createTrip();

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}`)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: trip.id,
        name: trip.name,
        description: trip.description,
        status: trip.status,
        budget: trip.budget,
      });
      expect(new Date(response.body.startDate)).toEqual(trip.startDate);
      expect(new Date(response.body.endDate)).toEqual(trip.endDate);
    });

    it("should return 404 for non-existent trip", async () => {
      const response = await testSuite
        .request()
        .get("/trips/999")
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("POST /trips", () => {
    it("should create a new trip with all fields", async () => {
      const tripData = e2eTestDataFactory.trip.valid;

      const response = await testSuite
        .request()
        .post("/trips")
        .send(tripData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        name: tripData.name,
        description: tripData.description,
        status: TripStatus.PLANNED,
        budget: tripData.budget,
      });
      expect(response.body.id).toBeDefined();
      expect(new Date(response.body.startDate)).toEqual(
        new Date(tripData.startDate),
      );
      expect(new Date(response.body.endDate)).toEqual(
        new Date(tripData.endDate),
      );

      // Verify in database
      const databaseTrip = await testSuite.prisma.trip.findUnique({
        where: { id: response.body.id },
      });
      expect(databaseTrip).toBeTruthy();
      expect(databaseTrip?.name).toBe(tripData.name);
    });

    it("should create a new trip with minimal required fields", async () => {
      const tripData = e2eTestDataFactory.trip.minimal;

      const response = await testSuite
        .request()
        .post("/trips")
        .send(tripData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        name: tripData.name,
        status: TripStatus.PLANNED,
      });
      expect(response.body.description).toBeNull();
      expect(response.body.budget).toBeNull();
    });

    it("should return 400 for invalid data", async () => {
      const invalidData = {
        name: "", // Empty name should be invalid
        startDate: "2025-07-01",
        endDate: "2025-06-01", // End date before start date
      };

      await testSuite
        .request()
        .post("/trips")
        .send(invalidData)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /trips/:id", () => {
    it("should update an existing trip", async () => {
      const trip = await dataHelper.createTrip();
      const updateData = e2eTestDataFactory.trip.update;

      const response = await testSuite
        .request()
        .put(`/trips/${String(trip.id)}`)
        .send(updateData)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: trip.id,
        name: updateData.name,
        description: updateData.description,
        status: updateData.status,
        budget: updateData.budget,
      });

      // Verify in database
      const databaseTrip = await testSuite.prisma.trip.findUnique({
        where: { id: trip.id },
      });
      expect(databaseTrip?.name).toBe(updateData.name);
      expect(databaseTrip?.status).toBe(updateData.status);
    });

    it("should return 404 for non-existent trip", async () => {
      const updateData = e2eTestDataFactory.trip.update;

      const response = await testSuite
        .request()
        .put("/trips/999")
        .send(updateData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("PATCH /trips/:id/status", () => {
    it("should update trip status", async () => {
      const trip = await dataHelper.createTrip();
      const statusUpdate = { status: TripStatus.ACTIVE };

      const response = await testSuite
        .request()
        .patch(`/trips/${String(trip.id)}/status`)
        .send(statusUpdate)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: trip.id,
        status: TripStatus.ACTIVE,
      });

      // Verify in database
      const databaseTrip = await testSuite.prisma.trip.findUnique({
        where: { id: trip.id },
      });
      expect(databaseTrip?.status).toBe(TripStatus.ACTIVE);
    });

    it("should return 404 for non-existent trip", async () => {
      const statusUpdate = { status: TripStatus.COMPLETED };

      const response = await testSuite
        .request()
        .patch("/trips/999/status")
        .send(statusUpdate)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("DELETE /trips/:id", () => {
    it("should delete an existing trip", async () => {
      const trip = await dataHelper.createTrip();

      await testSuite
        .request()
        .delete(`/trips/${String(trip.id)}`)
        .expect(HttpStatus.NO_CONTENT);

      // Verify trip is deleted from database
      const databaseTrip = await testSuite.prisma.trip.findUnique({
        where: { id: trip.id },
      });
      expect(databaseTrip).toBeNull();
    });

    it("should return 404 for non-existent trip", async () => {
      const response = await testSuite
        .request()
        .delete("/trips/999")
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });

    it("should cascade delete participants and expenses", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const expense = await dataHelper.createExpense(trip.id, participant.id);

      await testSuite
        .request()
        .delete(`/trips/${String(trip.id)}`)
        .expect(HttpStatus.NO_CONTENT);

      // Verify cascade deletion
      const databaseParticipant = await testSuite.prisma.participant.findUnique(
        {
          where: { id: participant.id },
        },
      );
      const databaseExpense = await testSuite.prisma.expense.findUnique({
        where: { id: expense.id },
      });

      expect(databaseParticipant).toBeNull();
      expect(databaseExpense).toBeNull();
    });
  });

  describe("GET /trips/:id/summary", () => {
    it("should return trip summary with participants and expenses", async () => {
      const trip = await dataHelper.createTrip();
      const participant1 = await dataHelper.createParticipant(trip.id);
      const participant2 = await dataHelper.createParticipant(trip.id, {
        name: "Jane Smith",
        email: "jane@example.com",
        isOrganizer: true,
      });
      const expense1 = await dataHelper.createExpense(trip.id, participant1.id);
      const expense2 = await dataHelper.createExpense(
        trip.id,
        participant2.id,
        {
          title: "Flight Tickets",
          amount: 50_000,
        },
      );

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/summary`)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        trip: {
          id: trip.id,
          name: trip.name,
          description: trip.description,
          status: trip.status,
          budget: trip.budget,
        },
        summary: {
          participantsCount: 2,
          totalExpenses: expense1.amount + expense2.amount,
        },
      });
      expect(response.body.summary.totalExpenses).toBe(
        expense1.amount + expense2.amount,
      );
      expect(response.body.summary.participantsCount).toBe(2);
    });

    it("should return 404 for non-existent trip", async () => {
      const response = await testSuite
        .request()
        .get("/trips/999/summary")
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });
});
