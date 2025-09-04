import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ParticipantModule } from "./participant/participant.module";

@Module({
  imports: [ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
