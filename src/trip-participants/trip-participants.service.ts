import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";

@Injectable()
export class TripParticipantsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTripParticipantDto: CreateTripParticipantDto) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: createTripParticipantDto.tripId },
    });
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: createTripParticipantDto.participantId },
    });

    if (trip === null || participant === null) {
      throw new NotFoundException("Trip or participant not found");
    }

    const tripParticipant =
      await this.databaseService.tripParticipants.findFirst({
        where: {
          trip_id: createTripParticipantDto.tripId,
          participant_id: createTripParticipantDto.participantId,
        },
      });

    if (tripParticipant !== null) {
      throw new ConflictException("Trip participant already exists");
    }

    return this.databaseService.tripParticipants.create({
      data: {
        trip_id: createTripParticipantDto.tripId,
        participant_id: createTripParticipantDto.participantId,
      },
    });
  }

  async findAll() {
    return this.databaseService.tripParticipants.findMany();
  }

  async findParticipantsOfTrip(tripId: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: tripId },
    });

    if (trip === null) {
      throw new NotFoundException("Trip not found");
    }

    const participants = await this.databaseService.tripParticipants.findMany({
      where: {
        trip_id: tripId,
      },
      include: {
        trip: true,
        participant: true,
      },
    });

    return participants;
  }

  async findTripsByParticipant(participantId: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: participantId },
    });

    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }

    const trips = await this.databaseService.tripParticipants.findMany({
      where: {
        participant_id: participantId,
      },
      include: {
        trip: true,
        participant: true,
      },
    });

    return trips;
  }

  async remove(tripId: number, participantId: number) {
    const tripParticipant =
      await this.databaseService.tripParticipants.findFirst({
        where: {
          trip_id: tripId,
          participant_id: participantId,
        },
      });

    if (tripParticipant === null) {
      throw new NotFoundException("Trip participant not found");
    }

    await this.databaseService.tripParticipants.delete({
      where: {
        trip_id_participant_id: {
          trip_id: tripId,
          participant_id: participantId,
        },
      },
    });

    return { message: "Trip participant removed successfully" };
  }

  async removeParticipantFromAllTrips(participantId: number) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: participantId },
    });

    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }

    await this.databaseService.tripParticipants.deleteMany({
      where: {
        participant_id: participantId,
      },
    });

    return { message: "Participant removed from all trips successfully" };
  }

  async removeAllParticipantsFromTrip(tripId: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: tripId },
    });

    if (trip === null) {
      throw new NotFoundException("Trip not found");
    }

    await this.databaseService.tripParticipants.deleteMany({
      where: {
        trip_id: tripId,
      },
    });

    return { message: "All participants removed from the trip successfully" };
  }
}
