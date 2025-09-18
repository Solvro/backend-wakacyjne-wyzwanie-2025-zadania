import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [DatabaseModule, AuthModule],
  exports: [CurrencyService],
})
export class CurrencyModule {}
