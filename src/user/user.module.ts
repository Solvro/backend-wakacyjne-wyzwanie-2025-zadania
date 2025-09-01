import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
