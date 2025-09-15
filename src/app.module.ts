import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/guards/auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";
import { ExpenseModule } from "./expense/expense.module";
import { ParticipantModule } from "./participant/participant.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripModule } from "./trip/trip.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    PrismaModule,
    TripModule,
    ParticipantModule,
    ExpenseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
