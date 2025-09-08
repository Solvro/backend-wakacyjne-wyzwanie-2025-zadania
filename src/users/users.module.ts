import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module, forwardRef } from "@nestjs/common";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
})
export class UsersModule {}
