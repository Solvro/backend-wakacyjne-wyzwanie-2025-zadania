import { Module } from "@nestjs/common";

import { DatabaseControler } from "./database.controller";
import { DatabaseService } from "./database.service";

@Module({
  imports: [],
  controllers: [DatabaseControler],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
