import { Module, forwardRef } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
})
export class UsersModule {}
