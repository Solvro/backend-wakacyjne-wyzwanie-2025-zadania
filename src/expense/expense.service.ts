import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(dto: CreateExpenseDto) {
    await this.ensureTrip(dto.tripId);
    await this.ensureMembership(dto.tripId, dto.payerId);

    return this.prisma.expense.create({
      data: {
        description: dto.description,
        cost: new Prisma.Decimal(dto.cost),
        type: dto.type,
        tripId: dto.tripId,
        payerId: dto.payerId,
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany({
      include: { trip: true, payer: true },
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const exp = await this.prisma.expense.findUnique({
      where: { id },
      include: { trip: true, payer: true },
    });
    if (exp == null) {
      throw new NotFoundException(`Expense ${String(id)} not found`);
    }
    return exp;
  }

  async update(id: number, dto: UpdateExpenseDto) {
    const current = await this.prisma.expense.findUnique({ where: { id } });
    if (current == null) {
      throw new NotFoundException(`Expense ${String(id)} not found`);
    }

    const nextTripId = dto.tripId ?? current.tripId;
    const nextPayerId = dto.payerId ?? current.payerId;

    if (dto.tripId !== undefined || dto.payerId !== undefined) {
      await this.ensureTrip(nextTripId);
      await this.ensureMembership(nextTripId, nextPayerId);
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        description: dto.description ?? undefined,
        cost: dto.cost === undefined ? undefined : new Prisma.Decimal(dto.cost),
        type: dto.type ?? undefined,
        tripId: dto.tripId ?? undefined,
        payerId: dto.payerId ?? undefined,
      },
      include: { trip: true, payer: true },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.expense.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new NotFoundException(`Expense ${String(id)} not found`);
    }
  }

  // — helpers —
  private async ensureTrip(tripId: number) {
    const t = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (t == null) {
      throw new NotFoundException(`Trip ${String(tripId)} not found`);
    }
  }

  private async ensureMembership(tripId: number, participantId: number) {
    const count = await this.prisma.trip.count({
      where: {
        id: tripId,
        participants: { some: { id: participantId } },
      },
    });

    if (count === 0) {
      throw new BadRequestException(
        `Participant ${String(participantId)} is not a member of Trip ${String(tripId)}`,
      );
    }
  }
}
