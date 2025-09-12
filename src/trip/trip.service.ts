import { Trip } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { PaginationDto } from "src/pagination/pagination.dto";
import { DEFAULT_PAGE_SIZE } from "src/pagination/utils/constants";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}
  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.database.trip.create({
      data: {
        name: createTripDto.name,
        date_start: createTripDto.date_start,
        date_end: createTripDto.date_end,
        description: createTripDto.description,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return this.database.trip.findMany({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(trip_id: number) {
    const trip = await this.database.trip.findUnique({ where: { trip_id } });
    if (trip == null) {
      throw new NotFoundException("No record with this id in db");
    }
    return trip;
  }

  async update(trip_id: number, updateTripDto: UpdateTripDto) {
    return this.database.trip.update({
      where: { trip_id },
      data: {
        name: updateTripDto.name,
        date_start: updateTripDto.date_start,
        date_end: updateTripDto.date_end,
        description: updateTripDto.description,
      },
    });
  }

  async remove(trip_id: number) {
    const record = await this.database.trip.findUnique({ where: { trip_id } });
    if (record == null) {
      throw new NotFoundException("No record with this id");
    }
    await this.database.tripParticipant.deleteMany({ where: { trip_id } });
    await this.database.expense.deleteMany({ where: { trip_id } });
    return this.database.trip.delete({ where: { trip_id } });
  }
}
