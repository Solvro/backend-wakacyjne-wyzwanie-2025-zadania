import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        destination: createTripDto.destination,
        description: createTripDto.description,
        start_date: createTripDto.start_date,
        end_date: createTripDto.end_date,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (trip === null) {
      throw new NotFoundException(`Trip with id not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({ where: { id }, data: updateTripDto });
  }

  async remove(id: number) {
    return this.prisma.trip.delete({ where: { id } });
  }
}
