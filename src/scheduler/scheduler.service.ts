import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CurrencyService } from "../currency/currency.service";
import { CreateCurrencyDto } from "../currency/dto/create-currency.dto";
import { ScrapperService } from "../scrapper/scrapper.service";

@Injectable()
export class SchedulerService {
  constructor(
    private scrapper: ScrapperService,
    private currencyservice: CurrencyService,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async addNewCurrencyRates(): Promise<void> {
    console.warn("siems wywołałem funckje");
    const data: CreateCurrencyDto[] =
      await this.scrapper.scrapeTop10currencies();
    for (const dto of data) {
      await this.currencyservice.create(dto);
    }
  }
}
