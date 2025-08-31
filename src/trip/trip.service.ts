import { Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        destination: createTripDto.destination,
        description: createTripDto.description,
        start_date: new Date(createTripDto.startDate),
        end_date:
          createTripDto.endDate == null
            ? undefined
            : new Date(createTripDto.endDate),
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
        expenses: {
          orderBy: {
            created_at: "desc",
          },
          take: 5,
        },
        participants: {
          orderBy: {
            participant_id: "asc",
          },
          take: 5,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.database.trip.findUnique({
      where: { trip_id: id },
      include: {
        expenses: true,
        participants: true,
      },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const existingTrip = await this.database.trip.findUnique({
      where: { trip_id: id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    return this.database.trip.update({
      where: { trip_id: id },
      data: {
        destination: updateTripDto.destination,
        description: updateTripDto.description,
        start_date: updateTripDto.startDate,
        end_date: updateTripDto.endDate,
      },
      include: {
        expenses: true,
        participants: true,
      },
    });
  }

  async remove(id: number) {
    const existingTrip = await this.database.trip.findUnique({
      where: { trip_id: id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }

    // delete related expenses and trip participants
    await this.database.expense.deleteMany({
      where: { trip_id: id },
    });

    await this.database.tripParticipants.deleteMany({
      where: { trip_id: id },
    });

    await this.database.trip.delete({
      where: { trip_id: id },
    });

    return { message: `Trip with ID ${id.toString()} deleted successfully` };
  }
}
