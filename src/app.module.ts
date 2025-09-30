import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { PaymentModule } from "./payment/payment.module";
import { SchedulerModule } from "./scheduler/scheduler.module";
import { ScraperModule } from "./scraper/scraper.module";
import { TripParticipantModule } from "./trip-participant/trip-participant.module";
import { TripModule } from "./trip/trip.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    DatabaseModule,
    ParticipantModule,
    ExpenseModule,
    TripModule,
    TripParticipantModule,
    UserModule,
    AuthModule,
    ScraperModule,
    SchedulerModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
