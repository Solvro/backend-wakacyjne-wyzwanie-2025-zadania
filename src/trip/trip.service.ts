import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    await this.database.trip.create({
      data: {
        id: createTripDto.id,
        name: createTripDto.name,
        start: createTripDto.start,
        end: createTripDto.end,
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
    await this.database.trip.update({
      where: { id },
      data: {
        id: updateTripDto.id,
        name: updateTripDto.name,
        start: updateTripDto.start,
        end: updateTripDto.end,
      },
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { id } });
  }
}
