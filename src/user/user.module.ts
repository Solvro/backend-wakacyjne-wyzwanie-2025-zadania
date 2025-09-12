import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule, AuthModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
