import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        startDate: createTripDto.startDate,
        endDate: createTripDto.endDate,
        location: createTripDto.location,
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany();
  }

  async findOne(id: number) {
    return this.database.trip.findUnique({ where: { id } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.database.trip.update({
      where: { id },
      data: {
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate,
        location: updateTripDto.location,
      },
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { id } });
  }
}
