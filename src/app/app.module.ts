import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ExpenseModule } from "../expense/expense.module";
import { ParticipantModule } from "../participant/participant.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [DatabaseModule, ParticipantModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
