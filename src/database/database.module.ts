import { Module } from "@nestjs/common";

import { DatabaseController } from "./database.controller";
import { DatabaseService } from "./database.service";

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
