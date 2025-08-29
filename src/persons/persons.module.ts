import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { PersonsController } from "./persons.controller";
import { PersonsService } from "./persons.service";

@Module({
  providers: [PersonsService, PrismaService],
  controllers: [PersonsController],
})
export class PersonsModule {}
