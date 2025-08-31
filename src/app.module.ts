import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";

@Module({
  imports: [PrismaModule, ParticipantsModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
