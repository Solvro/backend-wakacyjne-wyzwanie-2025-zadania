import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/role/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService, AuthService, RoleGuard],
  exports: [UsersService],
  imports: [PrismaModule],
  controllers: [UsersController],
})
export class UsersModule {}
