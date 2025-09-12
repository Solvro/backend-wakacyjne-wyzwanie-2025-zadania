import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/roles/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, RoleGuard, AuthService],
  controllers: [UserController],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
