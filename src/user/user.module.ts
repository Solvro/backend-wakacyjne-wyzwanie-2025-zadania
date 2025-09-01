import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module, forwardRef } from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
