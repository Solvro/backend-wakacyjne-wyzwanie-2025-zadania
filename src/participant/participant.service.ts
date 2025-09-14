import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    await this.database.user
      .findFirstOrThrow({
        where: { email: createParticipantDto.userEmail },
      })
      .catch(() => {
        throw new NotFoundException(
          `User with email ${createParticipantDto.userEmail} not found`,
        );
      });
    await this.database.trip
      .findFirstOrThrow({
        where: { id: createParticipantDto.tripId },
      })
      .catch(() => {
        throw new NotFoundException(
          `Trip with id ${createParticipantDto.tripId.toString()} not found`,
        );
      });

    return this.database.participant.create({
      data: {
        userEmail: createParticipantDto.userEmail,
        tripId: createParticipantDto.tripId,
      },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({
      where: { id },
    });
  }
}
