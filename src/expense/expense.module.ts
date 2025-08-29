import { AuthService } from "src/auth/auth.service";
import { DatabaseModule } from "src/database/database.module";
import { ParticipantModule } from "src/participant/participant.module";

import { Module } from "@nestjs/common";

import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, AuthService],
  imports: [DatabaseModule, ParticipantModule],
})
export class ExpenseModule {}
