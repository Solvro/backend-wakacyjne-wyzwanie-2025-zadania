import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [PrismaModule],
})
export class ParticipantModule {}
