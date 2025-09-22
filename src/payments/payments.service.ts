import { DatabaseService } from "src/database/database.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private database: DatabaseService) {}

  async create(email: string, createPaymentDto: CreatePaymentDto) {
    const participant = await this.database.participant
      .findFirstOrThrow({
        where: {
          tripId: createPaymentDto.tripId,
          userEmail: email,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Participant not found`);
      });
    const participantId = participant.id;
    await this.database.participant.findUniqueOrThrow({
      where: { id: participantId },
    });

    const exchange = await this.database.currencyExchange
      .findUniqueOrThrow({
        where: { currency: createPaymentDto.curency },
      })
      .catch(() => {
        throw new NotFoundException(`Currency not found`);
      });
    return await this.database.payments.create({
      data: {
        amount: exchange.exchange * createPaymentDto.amount,
        participant_id: participantId,
      },
    });
  }

  async findAll() {
    return await this.database.payments.findMany();
  }

  async findOne(id: number) {
    return await this.database.payments.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.database.payments.delete({
      where: { id },
    });
  }
}
