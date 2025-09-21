import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { scrapeNBP } from '../scrapers/currency-scraper';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  @Cron(CronExpression.EVERY_MINUTE) 
  async handleCron() {
    this.logger.log('Starting NBP scraper');
    try {
      await scrapeNBP();
      this.logger.log('Scraper completed successfully');
    } catch (error) {
      this.logger.error('Scraper error', error as Error);
    }
  }
}
