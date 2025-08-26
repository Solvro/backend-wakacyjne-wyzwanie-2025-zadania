import { Module } from "@nestjs/common";

import { PrismaController } from "./prisma.controller";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  controllers: [PrismaController],
  exports: [PrismaService],
})
export class PrismaModule {}
