import { Module } from '@nestjs/common';
import { AppController } from "./app.controller";
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ExpensesService } from './services/expense.service';
import { ParticipantsService } from './services/participant.service';
import { TripsService } from './services/trip.service';
import { PrismaService } from './services/prisma.service';
import { ExpenseController } from './controllers/expense.controller';
import { ParticipantController } from './controllers/participant.controller';
import { TripController } from './controllers/trip.controller';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { CurrnecyService } from './services/currency.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ScheduleModule.forRoot(), 
    DatabaseModule
  ],
  controllers: [AppController, ExpenseController, ParticipantController, TripController, UserController, AuthController],
  providers: [AppService, ExpensesService, ParticipantsService, TripsService, PrismaService, UserService, AuthService, CurrnecyService],
})
export class AppModule {}
