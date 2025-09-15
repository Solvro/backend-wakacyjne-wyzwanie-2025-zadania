import { Module } from "@nestjs/common";

import { CurrencyModule } from "../currency/currency.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule, CurrencyModule],
  exports: [PaymentsService],
})
export class PaymentsModule {}
