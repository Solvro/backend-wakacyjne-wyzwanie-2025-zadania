import { Module } from "@nestjs/common";

import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "../trips/trips.service";
import { UserService } from "../user/user.service";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  controllers: [ParticipantsController],
  providers: [
    ParticipantsService,
    TripsService,
    PrismaService,
    AuthService,
    UserService,
  ],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
