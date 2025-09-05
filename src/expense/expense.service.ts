import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(private database: DatabaseService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const payingParticipant = await this.database.participant.findUnique({
      where: { id: createExpenseDto.payingParticipantId },
    });

    if (payingParticipant === null) {
      throw new NotFoundException(
        `Participant with an Id of ${createExpenseDto.payingParticipantId.toString()} does not exist`,
      );
    }

    const trip = await this.database.trip.findUnique({
      where: { id: createExpenseDto.tripId },
    });

    if (trip === null) {
      throw new NotFoundException(
        `Trip with an Id of ${createExpenseDto.tripId.toString()} does not exist`,
      );
    }

    return this.database.expense.create({
      data: {
        tripId: createExpenseDto.tripId,
        payingParticipantId: createExpenseDto.payingParticipantId,
        title: createExpenseDto.title,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
      },
    });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.database.expense.findUnique({
      where: { id },
    });

    if (expense === null) {
      throw new NotFoundException(
        `Expense with an Id of ${id.toString()} does not exist`,
      );
    }

    if (updateExpenseDto.tripId !== undefined) {
      const trip = await this.database.trip.findUnique({
        where: { id: updateExpenseDto.tripId },
      });

      if (trip === null) {
        throw new NotFoundException(
          `Trip with an Id of ${updateExpenseDto.tripId.toString()} does not exist`,
        );
      }
    }

    if (updateExpenseDto.payingParticipantId !== undefined) {
      const participant = await this.database.participant.findUnique({
        where: { id: updateExpenseDto.payingParticipantId },
      });

      if (participant === null) {
        throw new NotFoundException(
          `Participant with an Id of ${updateExpenseDto.payingParticipantId.toString()} does not exist`,
        );
      }
    }

    return this.database.expense.update({
      where: { id },
      data: {
        tripId: updateExpenseDto.tripId,
        payingParticipantId: updateExpenseDto.payingParticipantId,
        title: updateExpenseDto.title,
        description: updateExpenseDto.description,
        amount: updateExpenseDto.amount,
      },
    });
  }

  async remove(id: number) {
    const expense = await this.database.expense.findUnique({
      where: { id },
    });

    if (expense === null) {
      throw new NotFoundException(
        `Expense with an Id of ${id.toString()} already does not exist`,
      );
    }

    return this.database.expense.delete({ where: { id } });
  }
}
