import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripParticipantDto } from "./dto/create-trip-participant.dto";
import { UpdateTripParticipantDto } from "./dto/update-trip-participant.dto";

@Injectable()
export class TripParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createTripParticipantDto: CreateTripParticipantDto) {
    await this.database.tripParticipant.create({
      data: {
        tripId: createTripParticipantDto.tripId,
        participantId: createTripParticipantDto.participantId,
      },
    });
  }

  async findAll() {
    await this.database.tripParticipant.findMany();
  }

  async findOne(id: number) {
    await this.database.tripParticipant.findUnique({ where: { id } });
  }

  async update(id: number, updateTripParticipantDto: UpdateTripParticipantDto) {
    return this.database.tripParticipant.update({
      where: { id },
      data: {
        tripId: updateTripParticipantDto.tripId,
        participantId: updateTripParticipantDto.participantId,
      },
    });
  }

  async remove(id: number) {
    await this.database.tripParticipant.delete({ where: { id } });
  }
}
