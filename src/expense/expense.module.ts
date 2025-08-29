import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserService } from "src/user/user.service";

import { Module } from "@nestjs/common";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, RoleGuard, AuthService, UserService],
  imports: [PrismaModule],
})
export class ExpenseModule {}
