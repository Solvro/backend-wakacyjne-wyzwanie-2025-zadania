import { Module } from "@nestjs/common";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
