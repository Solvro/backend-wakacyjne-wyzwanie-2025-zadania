import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [DatabaseService],
})
export class ExpenseModule {}
