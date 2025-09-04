import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { RoleGuard } from "../auth/role/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, RoleGuard],
  imports: [AuthModule, PrismaModule],
})
export class ExpensesModule {}
