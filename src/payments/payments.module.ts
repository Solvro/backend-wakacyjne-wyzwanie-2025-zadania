import { CurrencyModule } from "src/currency/currency.module";
import { CurrencyService } from "src/currency/currency.service";
import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule, CurrencyModule],
})
export class PaymentsModule {}
