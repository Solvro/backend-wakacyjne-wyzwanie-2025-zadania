import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RolesGuard } from "../auth/roles.guard";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, AuthService, RolesGuard],
  exports: [UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
