import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/roles/role.guard";
import {
  createMockParticipantsService,
  createMockTripsService,
} from "../test/test-utils";
import { TripsService } from "../trips/trips.service";
import type { ParticipantDto } from "./dto/participant.dto";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

describe("ParticipantsController", () => {
  let controller: ParticipantsController;

  // Using centralized mocks instead of inline declarations
  const mockParticipantsService = createMockParticipantsService();
  const mockTripsService = createMockTripsService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantsController],
      providers: [
        {
          provide: ParticipantsService,
          useValue: mockParticipantsService,
        },
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ParticipantsController>(ParticipantsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTripParticipants", () => {
    it("should delegate to TripsService.getTripParticipants", async () => {
      const tripId = 1;
      await controller.getTripParticipants(tripId);
      expect(mockTripsService.getTripParticipants).toHaveBeenCalledWith(tripId);
    });
  });

  describe("addParticipant", () => {
    it("should delegate to ParticipantsService.addParticipantToTrip", async () => {
      const tripId = 1;
      const participantDto: ParticipantDto = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+48123456789",
        isOrganizer: false,
      };

      await controller.addParticipant(tripId, participantDto);
      expect(mockParticipantsService.addParticipantToTrip).toHaveBeenCalledWith(
        tripId,
        participantDto,
      );
    });
  });

  describe("updateParticipant", () => {
    it("should delegate to ParticipantsService.updateParticipant", async () => {
      const participantId = 1;
      const updateParticipantDto: ParticipantDto = {
        name: "Updated Name",
        email: "updated@example.com",
        phone: "+48987654321",
        isOrganizer: true,
      };

      await controller.updateParticipant(participantId, updateParticipantDto);
      expect(mockParticipantsService.updateParticipant).toHaveBeenCalledWith(
        participantId,
        updateParticipantDto,
      );
    });
  });

  describe("deleteParticipant", () => {
    it("should delegate to ParticipantsService.deleteParticipant", async () => {
      const participantId = 1;
      await controller.deleteParticipant(participantId);
      expect(mockParticipantsService.deleteParticipant).toHaveBeenCalledWith(
        participantId,
      );
    });
  });
});
