import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, RoleGuard, AuthService],
  controllers: [UserController],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
