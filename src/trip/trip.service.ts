import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private readonly database: DatabaseService) {}
  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        name: createTripDto.name,
        description: createTripDto.description,
        begin_date: new Date(createTripDto.begin_date),
        end_date: new Date(createTripDto.end_date),
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
        name: updateTripDto.name,
        description: updateTripDto.description,
        begin_date: updateTripDto.begin_date,
        end_date: updateTripDto.end_date,
      },
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { id } });
  }
}
