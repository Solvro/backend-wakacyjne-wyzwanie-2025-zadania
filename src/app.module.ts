import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PersonsModule } from "./persons/persons.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./trips/trips.module";

@Module({
  imports: [
    PrismaModule,
    ParticipantsModule,
    ExpensesModule,
    TripsModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
