import { CurrencyService } from "src/currency/currency.service";
import { DatabaseService } from "src/database/database.service";

import { Module } from "@nestjs/common";

import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, DatabaseService, CurrencyService],
})
export class PaymentModule {}
