import { Module } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CurrencyModule } from "../currency/currency.module";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  imports: [CurrencyModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}
