import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";

@Module({
  imports: [ParticipantModule, DatabaseModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
