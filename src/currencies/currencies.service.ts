import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

@Injectable()
export class CurrenciesService {
  constructor(private databaseService: DatabaseService) {}

  async upsertCurrency(code: string, rate: number) {
    if (!/^[A-Z]{3}$/.test(code)) {
      throw new BadRequestException(
        "Invalid currency code - must be 3 uppercase letters",
      );
    }

    return this.databaseService.currency.upsert({
      where: { code },
      update: { rate },
      create: { code, rate },
    });
  }

  async getAll() {
    return await this.databaseService.currency.findMany();
  }

  async getOne(code: string) {
    const currency = await this.databaseService.currency.findUnique({
      where: { code },
    });

    if (currency == null) {
      throw new NotFoundException("Currency not found");
    }

    return currency;
  }
}
