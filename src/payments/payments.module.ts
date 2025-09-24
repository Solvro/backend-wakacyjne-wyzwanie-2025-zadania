import { Module } from "@nestjs/common";

import { CurrenciesModule } from "../currencies/currencies.module";
import { DatabaseModule } from "../database/database.module";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [DatabaseModule, CurrenciesModule],
})
export class PaymentsModule {}
