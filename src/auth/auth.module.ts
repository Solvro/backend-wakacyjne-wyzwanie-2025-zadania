import { Module } from "@nestjs/common";

import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule],
  exports: [AuthService],
})
export class AuthModule {}
