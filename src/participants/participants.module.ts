import { Module } from "@nestjs/common";

import { PrismaModule } from "../../prisma/prisma.module";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
