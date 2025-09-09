import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/user/user.module";

import { Global, Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [DatabaseModule, UserModule],
  exports: [AuthService],
})
export class AuthModule {}
