import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PaymentsModule } from "./payments/payments.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TasksModule } from "./tasks/tasks.module";
import { TripsModule } from "./trips/trips.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    PrismaModule,
    ParticipantsModule,
    ExpensesModule,
    TripsModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
