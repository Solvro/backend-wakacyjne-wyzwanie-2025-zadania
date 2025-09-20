/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpStatus } from "@nestjs/common";

import { E2EDataHelper, E2ETestSuite, e2eTestDataFactory } from "./e2e-utils";

describe("Participants (e2e)", () => {
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

  describe("GET /trips/:tripId/participants", () => {
    it("should return empty array when no participants exist", async () => {
      const trip = await dataHelper.createTrip();

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/participants`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
    });

    it("should return all participants for a trip", async () => {
      const trip = await dataHelper.createTrip();
      const participant1 = await dataHelper.createParticipant(trip.id);
      const participant2 = await dataHelper.createParticipant(trip.id, {
        name: "Jane Smith",
        email: "jane@example.com",
        isOrganizer: true,
      });

      const response = await testSuite
        .request()
        .get(`/trips/${String(trip.id)}/participants`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        id: participant1.id,
        name: participant1.name,
        email: participant1.email,
        phone: participant1.phone,
        isOrganizer: participant1.isOrganizer,
        tripId: trip.id,
      });
      expect(response.body[1]).toMatchObject({
        id: participant2.id,
        name: participant2.name,
        email: participant2.email,
        isOrganizer: participant2.isOrganizer,
        tripId: trip.id,
      });
    });

    it("should return 404 for non-existent trip", async () => {
      const response = await testSuite
        .request()
        .get("/trips/999/participants")
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("POST /trips/:tripId/participants", () => {
    it("should add a new participant to a trip", async () => {
      const trip = await dataHelper.createTrip();
      const participantData = e2eTestDataFactory.participant.valid;

      const response = await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/participants`)
        .send(participantData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        name: participantData.name,
        email: participantData.email,
        phone: participantData.phone,
        isOrganizer: participantData.isOrganizer,
        tripId: trip.id,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.joinedAt).toBeDefined();

      // Verify in database
      const databaseParticipant = await testSuite.prisma.participant.findUnique(
        {
          where: { id: response.body.id },
        },
      );
      expect(databaseParticipant).toBeTruthy();
      expect(databaseParticipant?.name).toBe(participantData.name);
      expect(databaseParticipant?.tripId).toBe(trip.id);
    });

    it("should add an organizer participant", async () => {
      const trip = await dataHelper.createTrip();
      const organizerData = e2eTestDataFactory.participant.organizer;

      const response = await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/participants`)
        .send(organizerData)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject({
        name: organizerData.name,
        email: organizerData.email,
        phone: organizerData.phone,
        isOrganizer: true,
        tripId: trip.id,
      });
    });

    it("should return 400 for invalid participant data", async () => {
      const trip = await dataHelper.createTrip();
      const invalidData = {
        name: "", // Empty name should be invalid
        email: "not-an-email-at-all", // Clearly invalid email format
        isOrganizer: false,
      };

      await testSuite
        .request()
        .post(`/trips/${String(trip.id)}/participants`)
        .send(invalidData)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return 404 for non-existent trip", async () => {
      const participantData = e2eTestDataFactory.participant.valid;

      const response = await testSuite
        .request()
        .post("/trips/999/participants")
        .send(participantData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain("Trip with ID 999 not found");
    });
  });

  describe("PUT /trips/:tripId/participants/:id", () => {
    it("should update an existing participant", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);
      const updateData = e2eTestDataFactory.participant.update;

      const response = await testSuite
        .request()
        .put(`/trips/${String(trip.id)}/participants/${String(participant.id)}`)
        .send(updateData)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject({
        id: participant.id,
        name: updateData.name,
        email: updateData.email,
        phone: updateData.phone,
        isOrganizer: updateData.isOrganizer,
        tripId: trip.id,
      });

      // Verify in database
      const databaseParticipant = await testSuite.prisma.participant.findUnique(
        {
          where: { id: participant.id },
        },
      );
      expect(databaseParticipant?.name).toBe(updateData.name);
      expect(databaseParticipant?.email).toBe(updateData.email);
      expect(databaseParticipant?.isOrganizer).toBe(updateData.isOrganizer);
    });

    it("should return 404 for non-existent participant", async () => {
      const trip = await dataHelper.createTrip();
      const updateData = e2eTestDataFactory.participant.update;

      const response = await testSuite
        .request()
        .put(`/trips/${String(trip.id)}/participants/999`)
        .send(updateData)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain(
        "Participant with ID 999 not found",
      );
    });
  });

  describe("DELETE /trips/:tripId/participants/:id", () => {
    it("should delete an existing participant", async () => {
      const trip = await dataHelper.createTrip();
      const participant = await dataHelper.createParticipant(trip.id);

      await testSuite
        .request()
        .delete(
          `/trips/${String(trip.id)}/participants/${String(participant.id)}`,
        )
        .expect(HttpStatus.NO_CONTENT);

      // Verify participant is deleted from database
      const databaseParticipant = await testSuite.prisma.participant.findUnique(
        {
          where: { id: participant.id },
        },
      );
      expect(databaseParticipant).toBeNull();
    });

    it("should return 404 for non-existent participant", async () => {
      const trip = await dataHelper.createTrip();

      const response = await testSuite
        .request()
        .delete(`/trips/${String(trip.id)}/participants/999`)
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body.message).toContain(
        "Participant with ID 999 not found",
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle multiple participants with same email in different trips", async () => {
      const trip1 = await dataHelper.createTrip();
      const trip2 = await dataHelper.createTrip({ name: "Second Trip" });

      const participantData = e2eTestDataFactory.participant.valid;

      // Add same email participant to both trips
      const response1 = await testSuite
        .request()
        .post(`/trips/${String(trip1.id)}/participants`)
        .send(participantData)
        .expect(HttpStatus.CREATED);

      const response2 = await testSuite
        .request()
        .post(`/trips/${String(trip2.id)}/participants`)
        .send(participantData)
        .expect(HttpStatus.CREATED);

      expect(response1.body.tripId).toBe(trip1.id);
      expect(response2.body.tripId).toBe(trip2.id);
      expect(response1.body.id).not.toBe(response2.body.id);
    });

    // Note: participant-expense relationship test removed as it's redundant
    // with the comprehensive test in expenses.e2e-spec.ts
  });
});
