import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const email = createParticipantDto.email;
    if (!email) {
      return this.database.participant.create({ data: createParticipantDto });
    }
    const existingUser = await this.database.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new BadRequestException(
        "Użytkownik o podanym emailu nie istnieje ",
      );
    }
    const existingParticipant = await this.database.participant.findUnique({
      where: { email },
    });
    if (existingParticipant) {
      throw new ConflictException(
        "Istnieje już participant przypisany do tego emaila",
      );
    }
    return this.database.participant.create({ data: createParticipantDto });
  }

  async findAll() {
    return this.database.participant.findMany();
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({ where: { id_p: id } });
  }

  async update(id: number, data: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { id_p: id },
      data,
    });
  }

  async remove(id: number) {
    return this.database.participant.delete({
      where: { id_p: id },
    });
  }
}
