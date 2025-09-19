import { Module } from "@nestjs/common";
import type { ModuleMetadata } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CurrencyModule } from "./currency/currency.module";
import { DatabaseModule } from "./database/database.module";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { TasksModule } from "./tasks/tasks.module";
import { TripModule } from "./trip/trip.module";

const imports: ModuleMetadata["imports"] = [
  TasksModule,
  DatabaseModule,
  ParticipantModule,
  ExpenseModule,
  AuthModule,
  TripModule,
  CurrencyModule,
];

if (process.env.NODE_ENV !== "test") {
  imports.push(ScheduleModule.forRoot());
}

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
