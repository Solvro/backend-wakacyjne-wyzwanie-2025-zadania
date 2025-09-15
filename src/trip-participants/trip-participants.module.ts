import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { TripParticipantsController } from "./trip-participants.controller";
import { TripParticipantsService } from "./trip-participants.service";

@Module({
  controllers: [TripParticipantsController],
  providers: [TripParticipantsService],
  imports: [DatabaseModule, AuthModule],
})
export class TripParticipantsModule {}
