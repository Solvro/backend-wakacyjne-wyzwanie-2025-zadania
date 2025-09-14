import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { DatabaseModule } from "../database/database.module";
import { DatabaseService } from "../database/database.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./roles/roles.guard";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: (process.env.JWT_SECRET ?? "") || "supersecret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard, DatabaseService],
  exports: [AuthService, JwtModule, AuthGuard, RolesGuard],
})
export class AuthModule {}
