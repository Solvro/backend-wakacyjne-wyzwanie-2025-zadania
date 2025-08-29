import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const { tripId, paidByParticipantId } = createExpenseDto;

    const trip = await this.database.trip.findUnique({
      where: { id: tripId },
      include: { participants: true },
    });

    if (trip === null) {
      throw new NotFoundException(
        `Not found trip with ID: ${tripId.toString()}`,
      );
    }

    const isParticipantInTrip = trip.participants.some(
      (p) => p.id === paidByParticipantId,
    );

    if (!isParticipantInTrip) {
      throw new BadRequestException(
        `Participant with ID: ${paidByParticipantId.toString()} is not part of Trip with ID: ${tripId.toString()}`,
      );
    }

    return this.database.expense.create({
      data: createExpenseDto,
    });
  }

  async findAll() {
    return this.database.expense.findMany({
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        category: true,
        trip: {
          select: {
            id: true,
            name: true,
          },
        },
        paidBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        category: true,
        trip: {
          select: {
            id: true,
            name: true,
            destination: true,
          },
        },
        paidBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (expense === null) {
      throw new NotFoundException(
        `Not found expense with ID: ${id.toString()}`,
      );
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.findOne(id);

    if (updateExpenseDto.tripId || updateExpenseDto.paidByParticipantId) {
      const finalTripId = updateExpenseDto.tripId ?? existingExpense.trip.id;
      const finalParticipantId =
        updateExpenseDto.paidByParticipantId ?? existingExpense.paidBy.id;

      const trip = await this.database.trip.findUnique({
        where: { id: finalTripId },
        include: { participants: true },
      });

      if (trip === null) {
        throw new NotFoundException(
          `Not found trip with ID: ${finalTripId.toString()}`,
        );
      }

      const isParticipantInTrip = trip.participants.some(
        (p) => p.id === finalParticipantId,
      );

      if (!isParticipantInTrip) {
        throw new BadRequestException(
          `Participant with ID: ${finalParticipantId.toString()} is not part of Trip with ID: ${finalTripId.toString()}`,
        );
      }
    }

    return this.database.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.database.expense.delete({
      where: { id },
    });
  }
}
