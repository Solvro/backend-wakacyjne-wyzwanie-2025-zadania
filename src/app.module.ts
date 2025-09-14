import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ParticipantsModule } from "./participants/participants.module";
import { PrismaModule } from "./prisma/prisma.module";
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
