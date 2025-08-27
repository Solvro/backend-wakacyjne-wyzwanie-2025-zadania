import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { PersonController } from "./person.controller";
import { PersonService } from "./person.service";

@Module({
  providers: [PersonService, PrismaService],
  controllers: [PersonController],
})
export class PersonModule {}
