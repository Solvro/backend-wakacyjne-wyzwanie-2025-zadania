import * as cheerio from "cheerio";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { ScrapeResultDto } from "./dto/scrape-result.dto";

@Injectable()
export class PaymentsService {
  private readonly url = "https://pomaranczarnia.pl/kursy-walut";
  private readonly toCurrency = "PLN";

  constructor(private prisma: PrismaService) {}

  async scrape(): Promise<ScrapeResultDto[]> {
    const response = await fetch(this.url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const rows = $("table.transList tr").not(":first-child");
    const results: ScrapeResultDto[] = [];

    rows.each((_, row) => {
      const columns = $(row).find("td");

      if (columns.length === 4) {
        const currency = $(columns[0]).find("a").text().trim();
        const buy = $(columns[1]).text().trim();
        const sell = $(columns[2]).text().trim();
        const time = $(columns[3]).text().trim();
        const today = new Date().toISOString().slice(0, 10);
        const updateTime = new Date(`${today}T${time}`);

        results.push({
          symbol: `${currency}${this.toCurrency}`,
          from: currency,
          to: this.toCurrency,
          buy: Number(buy.replace(",", ".")),
          sell: Number(sell.replace(",", ".")),
          average:
            (Number(buy.replace(",", ".")) + Number(sell.replace(",", "."))) /
            2,
          updateTime,
        });
      }
    });

    return results;
  }

  async updateRates(): Promise<void> {
    const results = await this.scrape();

    for (const rate of results) {
      await this.prisma.currencyRate.upsert({
        where: { symbol: rate.symbol },
        update: {
          buy: rate.buy,
          sell: rate.sell,
          average: rate.average,
          update_time: new Date(rate.updateTime),
        },
        create: {
          symbol: rate.symbol,
          from: rate.from,
          to: rate.to,
          buy: rate.buy,
          sell: rate.sell,
          average: rate.average,
          update_time: new Date(rate.updateTime),
        },
      });
    }
  }

  async getRate(from: string): Promise<ScrapeResultDto | null> {
    const rate = await this.prisma.currencyRate.findUnique({
      where: { symbol: `${from}${this.toCurrency}` },
    });

    if (rate === null) {
      return null;
    }

    return {
      symbol: rate.symbol,
      from: rate.from,
      to: rate.to,
      buy: rate.buy.toNumber(),
      sell: rate.sell.toNumber(),
      average: rate.average.toNumber(),
      updateTime: rate.update_time,
    };
  }
}
