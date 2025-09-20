import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { ForexController } from "./forex.controller";
import { ForexService } from "./forex.service";

@Module({
  controllers: [ForexController],
  providers: [ForexService, PrismaService],
  exports: [ForexService],
})
export class ForexModule {}
