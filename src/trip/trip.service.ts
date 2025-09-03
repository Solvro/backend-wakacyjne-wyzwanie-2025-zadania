import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  private async getTripOrThrow(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: id },
    });
    if (trip == null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }
    return trip;
  }

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        name: createTripDto.name,
        destination: createTripDto.destination,
        start_date: createTripDto.start_date,
        end_date: createTripDto.end_date,
        budget: createTripDto.budget,
      },
      include: {
        expenses: true,
        participants: true,
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany({
      include: {
        expenses: { orderBy: { expense_date: "desc" } },
        participants: { orderBy: { last_name: "asc" } },
      },
      orderBy: { start_date: "desc" },
    });
  }

  async findOne(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: id },
      include: {
        expenses: { orderBy: { expense_date: "desc" } },
        participants: { orderBy: { last_name: "asc" } },
      },
    });

    if (trip == null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.getTripOrThrow(id);

    return this.database.trip.update({
      where: { trip_id: id },
      data: {
        name: updateTripDto.name,
        destination: updateTripDto.destination,
        start_date: updateTripDto.start_date,
        end_date: updateTripDto.end_date,
        budget: updateTripDto.budget,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.getTripOrThrow(id);
    await this.database.expense.deleteMany({ where: { trip_id: id } });
    await this.database.participant.deleteMany({ where: { trip_id: id } });
    await this.database.trip.delete({ where: { trip_id: id } });
  }
}
