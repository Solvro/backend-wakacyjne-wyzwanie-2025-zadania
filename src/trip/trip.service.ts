import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    const participant = await this.database.participant.findUnique({
      where: { participantId: createTripDto.participantId },
    });

    if (participant == null) {
      throw new NotFoundException("Participant not found");
    }

    return this.database.trip.create({
      data: {
        participant: {
          connect: { participantId: createTripDto.participantId },
        },
        destination: createTripDto.destination,
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany();
  }

  async findOne(id: number) {
    return this.database.trip.findUnique({
      where: { tripId: id },
      include: {
        participant: true,
      },
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.database.trip.update({
      where: { tripId: id },
      data: {
        participantId: updateTripDto.participantId,
        destination: updateTripDto.destination,
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate,
      },
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { tripId: id } });
  }
}
