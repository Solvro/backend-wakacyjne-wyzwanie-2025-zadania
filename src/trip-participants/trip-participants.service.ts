import { Role } from "@prisma/client";

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata } from "../users/dto/user-metadata.dto";
import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";

@Injectable()
export class TripParticipantsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createTripParticipantDto: CreateTripParticipantDto,
    currentUser: UserMetadata,
  ) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: createTripParticipantDto.tripId },
    });
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: createTripParticipantDto.participantId },
    });

    if (trip === null || participant === null) {
      throw new NotFoundException("Trip or participant not found");
    }

    if (
      participant.created_by_user_id !== currentUser.userId &&
      currentUser.role !== Role.ADMIN &&
      currentUser.role !== Role.COORDINATOR
    ) {
      throw new ForbiddenException(
        "You are not allowed to add this participant",
      );
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

  async findAll(currentUser: UserMetadata) {
    return currentUser.role === Role.ADMIN ||
      currentUser.role === Role.COORDINATOR
      ? this.databaseService.tripParticipants.findMany()
      : this.databaseService.tripParticipants.findMany({
          where: {
            participant: {
              created_by_user_id: currentUser.userId,
            },
          },
        });
  }

  async findParticipantsOfTrip(tripId: number, currentUser: UserMetadata) {
    const trip = await this.databaseService.trip.findUnique({
      where: { trip_id: tripId },
    });

    if (trip === null) {
      throw new NotFoundException("Trip not found");
    }

    return currentUser.role === Role.ADMIN ||
      currentUser.role === Role.COORDINATOR
      ? await this.databaseService.tripParticipants.findMany({
          where: {
            trip_id: tripId,
          },
          include: {
            trip: true,
            participant: true,
          },
        })
      : await this.databaseService.tripParticipants.findMany({
          where: {
            trip_id: tripId,
            participant: {
              created_by_user_id: currentUser.userId,
            },
          },
          include: {
            trip: true,
            participant: true,
          },
        });
  }

  async findTripsByParticipant(
    participantId: number,
    currentUser: UserMetadata,
  ) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: participantId },
    });

    if (participant === null) {
      throw new NotFoundException("Participant not found");
    }

    if (
      currentUser.role !== Role.ADMIN &&
      currentUser.role !== Role.COORDINATOR &&
      participant.created_by_user_id !== currentUser.userId
    ) {
      throw new ForbiddenException(
        "You are not allowed to view this participant's trips",
      );
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

  async remove(
    tripId: number,
    participantId: number,
    currentUser: UserMetadata,
  ) {
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

    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: participantId },
    });

    if (
      currentUser.role !== Role.ADMIN &&
      currentUser.role !== Role.COORDINATOR &&
      (participant == null ||
        participant.created_by_user_id !== currentUser.userId)
    ) {
      throw new ForbiddenException(
        "You are not allowed to remove this participant from the trip",
      );
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
