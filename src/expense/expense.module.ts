import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
