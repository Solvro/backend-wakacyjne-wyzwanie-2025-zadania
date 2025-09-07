import { Module } from "@nestjs/common";

import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
