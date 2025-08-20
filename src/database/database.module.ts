import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { DatabaseService } from "./database.service";

@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {}
