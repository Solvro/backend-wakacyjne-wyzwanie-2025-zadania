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

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, ExpenseController, ParticipantController, TripController],
  providers: [AppService, ExpensesService, ParticipantsService, TripsService, PrismaService],
})
export class AppModule {}
