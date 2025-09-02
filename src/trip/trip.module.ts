import { AuthService } from "src/auth/auth.service";
import { RoleGuard } from "src/auth/roles/role.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";

import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService, RoleGuard, AuthService],
  imports: [PrismaModule, UserModule],
})
export class TripModule {}
