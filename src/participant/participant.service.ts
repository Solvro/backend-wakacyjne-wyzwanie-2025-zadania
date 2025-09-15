import { Role } from "@prisma/client";

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { UserMetadata } from "../users/dto/user-metadata.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    createParticipantDto: CreateParticipantDto,
    currentUser: UserMetadata,
  ) {
    return this.databaseService.participant.create({
      data: {
        first_name: createParticipantDto.firstName,
        last_name: createParticipantDto.lastName,
        email: createParticipantDto.email,
        phone: createParticipantDto.phone,
        created_by_user_id: currentUser.userId,
      },
    });
  }

  async findAll(currentUser: UserMetadata) {
    if (
      currentUser.role === Role.ADMIN ||
      currentUser.role === Role.COORDINATOR
    ) {
      return this.databaseService.participant.findMany({
        orderBy: {
          created_at: "desc",
        },
      });
    }

    return this.databaseService.participant.findMany({
      where: { created_by_user_id: currentUser.userId },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findOne(id: number, currentUser: UserMetadata) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    if (
      participant.created_by_user_id !== currentUser.userId &&
      currentUser.role !== Role.ADMIN &&
      currentUser.role !== Role.COORDINATOR
    ) {
      throw new ForbiddenException(
        "You do not have permission to view this participant",
      );
    }

    return participant;
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
    currentUser: UserMetadata,
  ) {
    const existingParticipant =
      await this.databaseService.participant.findUnique({
        where: { participant_id: id },
      });

    if (existingParticipant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    if (
      currentUser.role !== Role.ADMIN &&
      existingParticipant.created_by_user_id !== currentUser.userId
    ) {
      throw new ForbiddenException(
        "You do not have permission to update this participant",
      );
    }

    return this.databaseService.participant.update({
      where: { participant_id: id },
      data: {
        first_name: updateParticipantDto.firstName,
        last_name: updateParticipantDto.lastName,
        email: updateParticipantDto.email,
        phone: updateParticipantDto.phone,
      },
    });
  }

  async remove(id: number, currentUser: UserMetadata) {
    const participant = await this.databaseService.participant.findUnique({
      where: { participant_id: id },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }

    if (
      currentUser.role !== Role.ADMIN &&
      participant.created_by_user_id !== currentUser.userId
    ) {
      throw new ForbiddenException(
        "You do not have permission to delete this participant",
      );
    }

    await this.databaseService.tripParticipants.deleteMany({
      where: { participant_id: id },
    });

    await this.databaseService.participant.delete({
      where: { participant_id: id },
    });

    return {
      message: `Participant with ID ${id.toString()} removed successfully`,
    };
  }
}
