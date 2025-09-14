import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { ExpenseModule } from "../expense/expense.module";
import { ParticipantModule } from "../participant/participant.module";
import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    DatabaseModule,
    ParticipantModule,
    ExpenseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
