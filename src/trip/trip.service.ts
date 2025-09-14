import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        participant_id: createTripDto.participant_id,
        destination: createTripDto.destination,
        date_start: createTripDto.date_start,
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany();
  }

  async findOne(id: number) {
    const trip: unknown = await this.database.trip.findUnique({
      where: { id },
    });
    if (trip == null) {
      throw new NotFoundException(
        "EXEPTION: No trip with this id found in database!",
      );
    } else {
      return trip;
    }
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip: unknown = this.database.trip.findUnique({
      where: { id },
    });
    if (trip == null) {
      throw new NotFoundException(
        "EXEPTION: No trip with this id found in database!",
      );
    } else {
      return this.database.trip.update({
        where: { id },
        data: {
          participant_id: updateTripDto.participant_id,
          destination: updateTripDto.destination,
          date_start: updateTripDto.date_start,
        },
      });
    }
  }

  async remove(id: number) {
    const trip: unknown = this.database.trip.findUnique({
      where: { id },
    });
    if (trip == null) {
      throw new NotFoundException(
        "EXEPTION: No trip with this id found in database!",
      );
    } else {
      return this.database.trip.delete({ where: { id } });
    }
  }
}
