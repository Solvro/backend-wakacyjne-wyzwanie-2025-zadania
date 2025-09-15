import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/roles/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { UserService } from "../user/user.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, RoleGuard, AuthService, UserService],
  imports: [PrismaModule],
})
export class ExpenseModule {}
