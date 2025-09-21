import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
