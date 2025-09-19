import { Module } from "@nestjs/common";

import { ExchangeModule } from "../exchange/exchange.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [PrismaModule, ExchangeModule],
})
export class ExpenseModule {}
