import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import {
  CreateParticipantDto,
  ParticipantResponseDto,
  UpdateParticipantDto,
} from "../dto/participant.dto";

@Controller("participants")
export class ParticipantsController {
  constructor(private readonly prisma: DatabaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    try {
      return await this.prisma.participant.create({
        data: dto,
        include: { trips: true },
      });
    } catch {
      throw new BadRequestException("Failed to create participant");
    }
  }

  @Get()
  async findAll(): Promise<ParticipantResponseDto[]> {
    try {
      return await this.prisma.participant.findMany({
        include: { trips: true },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      throw new InternalServerErrorException("Failed to retrieve participants");
    }
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ParticipantResponseDto> {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: {
        trips: true,
        expenses: true,
      },
    });
    if (participant == null) {
      throw new NotFoundException(
        `Participant with ID ${id.toString()} not found`,
      );
    }
    return participant;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ): Promise<ParticipantResponseDto> {
    try {
      return await this.prisma.participant.update({
        where: { id },
        data: dto,
        include: {
          trips: true,
          expenses: true,
        },
      });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(
          `Participant with ID ${id.toString()} not found`,
        );
      }
      throw new BadRequestException("Failed to update participant");
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      await this.prisma.participant.delete({ where: { id } });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(
          `Participant with ID ${id.toString()} not found`,
        );
      }
      throw new BadRequestException("Failed to delete participant");
    }
  }
}
