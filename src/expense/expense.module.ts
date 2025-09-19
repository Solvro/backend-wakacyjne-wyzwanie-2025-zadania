import { Module } from "@nestjs/common";

import { CurrencyModule } from "../currency/currency.module";
import { CurrencyService } from "../currency/currency.service";
import { DatabaseModule } from "../database/database.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, CurrencyService],
  imports: [DatabaseModule, CurrencyModule],
})
export class ExpenseModule {}
