import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExpensesController } from "./controllers/expenses.controller";
import { TripsController } from "./controllers/trips.controller";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, ExpensesController, TripsController],
  providers: [AppService],
})
export class AppModule {}
