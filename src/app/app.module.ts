import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { ExpenseModule } from "../expense/expense.module";
import { ParticipantModule } from "../participant/participant.module";
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
