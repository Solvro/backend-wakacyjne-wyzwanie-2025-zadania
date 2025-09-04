import { AuthModule } from "src/auth/auth.module";
import { RoleGuard } from "src/auth/role/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, RoleGuard],
  imports: [AuthModule, PrismaModule],
})
export class ExpensesModule {}
