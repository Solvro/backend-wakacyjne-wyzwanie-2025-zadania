import { Module } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService, DatabaseService],
  controllers: [AuthController],
})
export class AuthModule {}
