import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import type { CreateExpenseDto } from "./dto/expense.dto";

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async addExpenseToTrip(tripId: number, createExpenseDto: CreateExpenseDto) {
    // Validate that trip exists
    const existingTrip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (existingTrip === null) {
      throw new NotFoundException(`Trip with ID ${String(tripId)} not found`);
    }

    // Validate that participant exists and belongs to the trip
    const participant = await this.prisma.participant.findFirst({
      where: {
        id: createExpenseDto.participantId,
        tripId,
      },
    });

    if (participant === null) {
      throw new NotFoundException(
        `Participant with ID ${String(createExpenseDto.participantId)} not found in trip ${String(tripId)}`,
      );
    }

    return this.prisma.expense.create({
      data: {
        title: createExpenseDto.title,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        date: new Date(createExpenseDto.date),
        tripId,
        participantId: createExpenseDto.participantId,
      },
      include: {
        participant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
