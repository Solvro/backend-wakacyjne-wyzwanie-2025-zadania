import { Module } from "@nestjs/common";

import { ActivityController } from "./activity/activity.controller";
import { ActivityModule } from "./activity/activity.module";
import { ActivityService } from "./activity/activity.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { DatabaseController } from "./database/database.controller";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";
import { ExpenseController } from "./expense/expense.controller";
import { ExpenseModule } from "./expense/expense.module";
import { ExpenseService } from "./expense/expense.service";
import { ParticipantController } from "./participant/participant.controller";
import { ParticipantModule } from "./participant/participant.module";
import { ParticipantService } from "./participant/participant.service";
import { TripController } from "./trip/trip.controller";
import { TripModule } from "./trip/trip.module";
import { TripService } from "./trip/trip.service";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    DatabaseModule,
    ParticipantModule,
    TripModule,
    ExpenseModule,
    ActivityModule,
    AuthModule,
    UserModule,
    ActivityModule,
  ],
  controllers: [
    AppController,
    DatabaseController,
    ExpenseController,
    TripController,
    ParticipantController,
    ActivityController,
    AuthController,
    UserController,
  ],
  providers: [
    AppService,
    DatabaseService,
    ExpenseService,
    ParticipantService,
    TripService,
    ActivityService,
    AuthService,
    UserService,
  ],
})
export class AppModule {}
