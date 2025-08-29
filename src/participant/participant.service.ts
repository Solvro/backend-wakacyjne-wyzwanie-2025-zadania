import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const { tripIds, ...participantData } = createParticipantDto;

    return this.database.participant.create({
      data: {
        ...participantData,
        ...(tripIds != null &&
          tripIds.length > 0 && {
            trips: {
              connect: tripIds.map((id) => ({ id })),
            },
          }),
      },
      include: { trips: true },
    });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    const participant = await this.database.participant.findUnique({
      where: { id },
      include: { trips: true },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Not found participant with ID: ${id.toString()}`,
      );
    }

    return participant;
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const { tripIds, ...participantData } = updateParticipantDto;

    await this.findOne(id);

    return this.database.participant.update({
      where: { id },
      data: {
        ...participantData,
        ...(tripIds != null && {
          trips: {
            set: tripIds.map((tripId) => ({ id: tripId })),
          },
        }),
      },
      include: { trips: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.database.participant.delete({ where: { id } });
  }
}
