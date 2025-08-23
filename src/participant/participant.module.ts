import { PrismaModule } from "src/prisma/prisma.module";

import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [PrismaModule],
})
export class ParticipantModule {}
