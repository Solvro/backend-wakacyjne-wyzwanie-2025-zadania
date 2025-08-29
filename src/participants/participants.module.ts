import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  providers: [ParticipantsService, PrismaService],
  controllers: [ParticipantsController],
})
export class ParticipantsModule {}
