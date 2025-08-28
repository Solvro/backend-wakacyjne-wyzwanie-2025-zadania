import { TripStatus } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateTripDto, UpdateTripDto } from "./dto/trip.dto";

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        participants: true,
        expenses: true,
        _count: {
          select: {
            participants: true,
            expenses: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        participants: true,
        expenses: {
          include: {
            participant: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    return trip;
  }

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        name: createTripDto.name,
        description: createTripDto.description,
        status: createTripDto.status ?? TripStatus.PLANNED,
        startDate: new Date(createTripDto.startDate),
        endDate: new Date(createTripDto.endDate),
        budget: createTripDto.budget,
      },
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    return this.prisma.trip.update({
      where: { id },
      data: {
        name: updateTripDto.name,
        description: updateTripDto.description,
        status: updateTripDto.status,
        startDate:
          updateTripDto.startDate === undefined
            ? undefined
            : new Date(updateTripDto.startDate),
        endDate:
          updateTripDto.endDate === undefined
            ? undefined
            : new Date(updateTripDto.endDate),
        budget: updateTripDto.budget,
      },
      include: {
        participants: true,
        expenses: true,
      },
    });
  }

  async updateStatus(id: number, status: TripStatus) {
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    return this.prisma.trip.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: number) {
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(id)} not found`);
    }

    await this.prisma.trip.delete({
      where: { id },
    });
  }

  async getTripSummary(id: number) {
    const trip = await this.findOne(id);

    const totalExpenses = trip.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    const expensesByCategory = trip.expenses.reduce<Record<string, number>>(
      (accumulator, expense) => {
        const currentAmount = accumulator[expense.category];
        accumulator[expense.category] = (currentAmount || 0) + expense.amount;
        return accumulator;
      },
      {},
    );

    const expensesByParticipant = trip.expenses.reduce<Record<string, number>>(
      (accumulator, expense) => {
        const participantName = expense.participant.name;
        const currentAmount = accumulator[participantName];
        accumulator[participantName] = (currentAmount || 0) + expense.amount;
        return accumulator;
      },
      {},
    );

    return {
      trip: {
        id: trip.id,
        name: trip.name,
        description: trip.description,
        status: trip.status,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
      },
      summary: {
        participantsCount: trip.participants.length,
        totalExpenses,
        budgetRemaining:
          trip.budget === null ? null : trip.budget - totalExpenses,
        expensesByCategory,
        expensesByParticipant,
      },
    };
  }

  private async validateTripExists(tripId: number) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (trip === null) {
      throw new NotFoundException(`Trip with ID ${String(tripId)} not found`);
    }

    return trip;
  }

  async getTripParticipants(tripId: number) {
    await this.validateTripExists(tripId);

    return this.prisma.participant.findMany({
      where: { tripId },
      include: {
        expenses: {
          select: {
            id: true,
            title: true,
            amount: true,
            category: true,
            date: true,
          },
        },
      },
    });
  }

  async getTripExpenses(tripId: number) {
    await this.validateTripExists(tripId);

    return this.prisma.expense.findMany({
      where: { tripId },
      include: {
        participant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  }
}
