import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [DatabaseModule, AuthModule],
})
export class ExpenseModule {}
