import { Prisma } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

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
    const { participantIds, expensesIds, ...tripData } = createTripDto;
    return this.database.trip.create({
      data: {
        ...tripData,
        ...(participantIds !== undefined &&
          participantIds.length > 0 && {
            participants: {
              connect: participantIds.map((id) => ({ id })),
            },
          }),
        ...(expensesIds !== undefined &&
          expensesIds.length > 0 && {
            expenses: {
              connect: expensesIds.map((id) => ({ id })),
            },
          }),
      },
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
    const trip = await this.database.trip.findUnique({ where: { id } });
    if (trip === null) {
      throw new NotFoundException(`Trip with id ${String(id)} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const { participantIds, expensesIds, ...tripData } = updateTripDto;
    try {
      const trip = await this.database.trip.update({
        where: { id },
        data: {
          ...tripData,
          ...(participantIds !== undefined && {
            participants:
              participantIds.length > 0
                ? {
                    set: participantIds.map((participantId) => ({
                      id: participantId,
                    })),
                  }
                : {
                    set: [],
                  },
          }),
          ...(expensesIds !== undefined && {
            expenses:
              expensesIds.length > 0
                ? {
                    set: expensesIds.map((expenseId) => ({ id: expenseId })),
                  }
                : {
                    set: [],
                  },
          }),
        },
      });
      return trip;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    const trip = await this.database.trip.findUnique({ where: { id } });
    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${id.toString()} not found`);
    }
    const deletedTrip = await this.database.trip.delete({ where: { id } });
    return deletedTrip;
  }
}
