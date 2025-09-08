import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ExpensesService } from "./expenses.service";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
