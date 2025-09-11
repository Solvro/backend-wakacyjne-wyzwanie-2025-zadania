import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { DatabaseService } from "../database/database.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_SECRET ?? "") || "supersecret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService],
  exports: [AuthService],
})
export class AuthModule {}
