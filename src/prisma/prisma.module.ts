import { Module } from "@nestjs/common";

import { PrismaController } from "./prisma.controller";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [PrismaController],
})
export class PrismaModule {}
