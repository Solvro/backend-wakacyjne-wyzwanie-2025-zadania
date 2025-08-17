import { DatabaseController } from "src/database/database.controller";

import { Module } from "@nestjs/common";

import { DatabaseService } from "./database.service";

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
