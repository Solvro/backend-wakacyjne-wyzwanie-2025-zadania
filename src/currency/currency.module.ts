import { Module } from "@nestjs/common";

//import { DatabaseModule } from "../database/database.module";
//import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";

@Module({
  controllers: [],
  providers: [CurrencyService],
  imports: [],
})
export class CurrencyModule {}
