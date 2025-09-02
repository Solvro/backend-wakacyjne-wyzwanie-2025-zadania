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
        name: createTripDto.name,
        destination: createTripDto.destination,
        start_date: new Date(createTripDto.start_date),
        end_date:
          createTripDto.end_date == null
            ? null
            : new Date(createTripDto.end_date),
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
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: id },
    });

    if (trip == null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

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

  async remove(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: id },
    });

    if (trip == null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    await this.database.expense.deleteMany({ where: { trip_id: id } });
    await this.database.participant.deleteMany({ where: { trip_id: id } });
    await this.database.trip.delete({ where: { trip_id: id } });

    return { message: `Trip with ID ${String(id)} deleted successfully` };
  }
}
