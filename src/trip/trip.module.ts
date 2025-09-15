import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { RoleGuard } from "../auth/roles/role.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { TripController } from "./trip.controller";
import { TripService } from "./trip.service";

@Module({
  controllers: [TripController],
  providers: [TripService, RoleGuard, AuthService],
  imports: [PrismaModule, UserModule],
})
export class TripModule {}
