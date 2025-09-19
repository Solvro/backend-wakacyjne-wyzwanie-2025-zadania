import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/roles.guard";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, RolesGuard],
  imports: [DatabaseModule, AuthModule],
})
export class ExpenseModule {}
