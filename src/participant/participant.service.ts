import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantMetadata } from "./dto/participant-metadata.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private database: DatabaseService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const hashed_password = await hash(createParticipantDto.password, 10);
    try {
      return await this.database.participant.create({
        data: {
          name: createParticipantDto.name,
          surname: createParticipantDto.surname,
          account_type: createParticipantDto.account_type,
          email: createParticipantDto.email,
          password: hashed_password,
          role: createParticipantDto.role,
        },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "Participant with this email address already exists.",
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.database.participant.findMany({
      omit: { surname: true, password: true, email: true },
    });
  }

  async findOne(id: number) {
    return this.database.participant.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findByEmail(email: string) {
    return this.database.participant.findUnique({
      where: { email },
    });
  }

  async findMetadata(id: number): Promise<ParticipantMetadata | undefined> {
    const participant = await this.database.participant.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        account_type: true,
      },
    });

    return participant ?? undefined;
  }

  async updateAny(updateParticipantDto: UpdateParticipantDto) {
    return this.database.participant.update({
      where: { id: updateParticipantDto.id },
      data: {
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        account_type: updateParticipantDto.account_type,
      },
      omit: {
        password: true,
      },
    });
  }

  async updateSelf(id: number, updateParticipantDto: UpdateParticipantDto) {
    if (updateParticipantDto.id != null && updateParticipantDto.id !== id) {
      throw new UnauthorizedException("Only admins can modify other users.");
    }
    return this.database.participant.update({
      where: { id },
      data: {
        name: updateParticipantDto.name,
        surname: updateParticipantDto.surname,
        account_type: updateParticipantDto.account_type,
      },
      omit: {
        password: true,
      },
    });
  }

  async deleteAny(id: number) {
    return this.database.participant.delete({ where: { id } });
  }
  async deleteSelf(target_id: number, self_id: number) {
    if (target_id && target_id !== self_id) {
      throw new UnauthorizedException("Only admins can modify other users.");
    }
    return this.database.participant.delete({ where: { id: self_id } });
  }
}
