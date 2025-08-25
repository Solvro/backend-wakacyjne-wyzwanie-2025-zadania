import { Module } from '@nestjs/common';
// eslint-disable-next-line import/namespace
import { AppController } from "./app.controller";
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ExpensesService } from './services/expense.service';
import { ParticipantsService } from './services/participant.service';
import { TripsService } from './services/trip.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ExpensesService, ParticipantsService, TripsService, PrismaService],
})
export class AppModule {}
