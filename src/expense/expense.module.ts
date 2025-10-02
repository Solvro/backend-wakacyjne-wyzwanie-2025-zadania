import { Module } from "@nestjs/common";

import { CurrencyModule } from "../currency/currency.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  imports: [CurrencyModule],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
