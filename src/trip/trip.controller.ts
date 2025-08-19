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
import { CreateTripDto, TripResponseDto, UpdateTripDto } from "../dto/trip.dto";

@Controller("trips")
export class TripsController {
  constructor(private readonly prisma: DatabaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTripDto): Promise<TripResponseDto> {
    try {
      return await this.prisma.trip.create({
        data: dto,
        include: { participants: true },
      });
    } catch {
      throw new BadRequestException("Failed to create participant");
    }
  }

  @Get()
  async findAll(): Promise<TripResponseDto[]> {
    try {
      return await this.prisma.trip.findMany({
        include: { participants: true },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      throw new InternalServerErrorException("Failed to retrieve trips");
    }
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TripResponseDto> {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        participants: true,
        expenses: true,
      },
    });
    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }
    return trip;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTripDto,
  ): Promise<TripResponseDto> {
    try {
      const trip = await this.prisma.trip.update({
        where: { id },
        data: dto,
        include: {
          participants: true,
          expenses: true,
        },
      });
      return trip;
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
      }
      throw new BadRequestException("Failed to update trip");
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      await this.prisma.trip.delete({ where: { id } });
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
      }
      throw new BadRequestException("Failed to delete trip");
    }
  }
}
