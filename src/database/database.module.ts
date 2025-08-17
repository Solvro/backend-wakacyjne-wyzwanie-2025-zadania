import { Module } from "@nestjs/common";

import { DatabaseController } from "./database.controller";
import { DatabaseService } from "./database.service";
import { ParticipantService } from "./participant.service";

@Module({
  providers: [DatabaseService, ParticipantService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
