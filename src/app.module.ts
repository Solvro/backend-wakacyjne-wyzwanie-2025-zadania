import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { TripsModule } from "./trips/trips.module";

@Module({
  imports: [TripsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
