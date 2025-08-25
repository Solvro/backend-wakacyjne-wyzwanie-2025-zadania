import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

interface TripOptions {
  where?: Prisma.TripWhereInput;
  orderBy?: Prisma.TripOrderByWithRelationInput;
  skip?: number;
  take?: number;
  include?: Prisma.TripInclude;
}

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}
  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: createTripDto,
    });
  }

  async findAll(options?: TripOptions) {
    return this.database.trip.findMany({
      where: options?.where,
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
      include: options?.include,
    });
  }

  async findOne(id: number) {
    return this.database.trip.findUnique({ where: { id } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.database.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { id } });
  }

  async addTripToParticipant(tripId: number, participantId: number) {
    return this.database.trip.update({
      where: { id: tripId },
      data: {
        participants: {
          connect: { id: participantId },
        },
      },
    });
  }

  async addTripToExpense(tripId: number, expenseId: number) {
    return this.database.trip.update({
      where: { id: tripId },
      data: {
        expenses: {
          connect: { id: expenseId },
        },
      },
    });
  }

  async removeTripFromParticipant(tripId: number, participantId: number) {
    return this.database.trip.update({
      where: { id: tripId },
      data: {
        participants: {
          disconnect: { id: participantId },
        },
      },
    });
  }

  async removeTripFromExpense(tripId: number, expenseId: number) {
    return this.database.trip.update({
      where: { id: tripId },
      data: {
        expenses: {
          disconnect: { id: expenseId },
        },
      },
    });
  }

  async findTripsByParticipant(
    participantId: number,
    options?: Omit<TripOptions, "where"> & { where?: Prisma.TripWhereInput },
  ) {
    return this.database.trip.findMany({
      where: {
        participants: {
          some: { id: participantId },
        },
        ...options?.where,
      },
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
      include: options?.include,
    });
  }
}
