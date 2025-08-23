import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ParticipantModule } from "./participant/participant.module";

@Module({
  imports: [DatabaseModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
