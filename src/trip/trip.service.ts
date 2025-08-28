import { DatabaseService } from "src/database/database.service";

import { Injectable } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { DEFAULT_PAGE_SIZE } from "./utils/constants";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}
  async create(createTripDto: CreateTripDto) {
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
      skip: paginationDto.offset,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(trip_id: number) {
    return this.database.trip.findUnique({ where: { trip_id } });
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
    return this.database.trip.delete({ where: { trip_id } });
  }
}
