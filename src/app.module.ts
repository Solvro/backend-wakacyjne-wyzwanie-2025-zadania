import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./trips/trips.module";

@Module({
  imports: [PrismaModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
