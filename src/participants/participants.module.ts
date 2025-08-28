import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { TripsService } from "../trips/trips.service";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, TripsService, PrismaService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
