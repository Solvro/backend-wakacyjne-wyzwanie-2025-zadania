import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  providers: [ParticipantService, PrismaService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
