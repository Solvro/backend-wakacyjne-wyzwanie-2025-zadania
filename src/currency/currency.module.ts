import { Module } from "@nestjs/common";

import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
