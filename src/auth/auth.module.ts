import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CustomTokenStrategy } from "./strategies/custom-token.strategy";

@Module({
  imports: [UserModule, PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, CustomTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
