import { Prisma } from "@prisma/client";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CurrencyService } from "../currency/currency.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currency: CurrencyService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const currency = dto.currency.toUpperCase();

    const trip = await this.prisma.trip.findUnique({
      where: { id: dto.tripId },
    });
    if (trip == null) {
      throw new NotFoundException("Trip not found");
    }

    const amount = Number(dto.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Invalid amount");
    }

    let rate = 1;
    if (currency !== "PLN") {
      const latest = await this.currency.getLatestRate(currency, "PLN");
      if (latest == null) {
        throw new BadRequestException(`No rate for ${currency}/PLN`);
      }
      rate = latest;
    }

    const amountPln = Math.round(amount * rate * 100) / 100;

    const created = await this.prisma.payment.create({
      data: {
        tripId: dto.tripId,
        participantId: dto.participantId ?? null,
        currency,
        amountForeign: new Prisma.Decimal(dto.amount),
        rate: new Prisma.Decimal(rate.toFixed(8)),
        amountPln: new Prisma.Decimal(amountPln.toFixed(2)),
      },
    });

    return created;
  }
}
