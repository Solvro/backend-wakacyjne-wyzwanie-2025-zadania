import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { CurrencyModule } from "../currency/currency.module";
import { DatabaseModule } from "../database/database.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [DatabaseModule, AuthModule, CurrencyModule],
})
export class ExpenseModule {}
