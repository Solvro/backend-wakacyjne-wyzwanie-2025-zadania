import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // TO JEST NAJWAŻNIEJSZE - musi eksportować PrismaService
})
export class DatabaseModule {}
