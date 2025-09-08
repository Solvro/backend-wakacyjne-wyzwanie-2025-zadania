import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TripParticipantsController } from "./trip-participants.controller";
import { TripParticipantsService } from "./trip-participants.service";

@Module({
  controllers: [TripParticipantsController],
  providers: [TripParticipantsService],
  imports: [DatabaseModule, AuthModule],
})
export class TripParticipantsModule {}
