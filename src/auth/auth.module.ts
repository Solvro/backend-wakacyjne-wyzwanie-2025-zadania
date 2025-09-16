import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RoleGuard } from "./roles/role.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, RoleGuard],
  imports: [UserModule],
  exports: [AuthService, RoleGuard],
})
export class AuthModule {}
