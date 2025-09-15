/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Currencies } from "@prisma/client";
import { load } from "cheerio";
import puppeteer, { Browser, LaunchOptions } from "puppeteer";

import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly launchOptions: LaunchOptions = { headless: true };
  constructor(private prisma: PrismaService) {}

  @Cron("0 */30 * * * *")
  async handleCron() {
    await this.scrapeRates();
  }

  async onModuleInit() {
    await this.scrapeRates();
  }

  // Helper function
  private async scrapeRates() {
    const browser: Browser = await puppeteer.launch(this.launchOptions);
    const page = await browser.newPage();

    await page.goto("https://internetowykantor.pl/kursy-walut", {
      waitUntil: "networkidle2",
    });

    const $ = load(await page.content());

    const data = $.extract({
      rows: [
        {
          selector: "a.bem-rate-table__redirect.bem-rate-table__row",
          value: {
            code: ".nameplate__short-name",
            rate: '[data-rates-direction="forex"]',
          },
        },
      ],
    });

    await browser.close();
    for (const element of data.rows) {
      if ((element.code ?? "") in Currencies) {
        await this.prisma.currencyRate.create({
          data: {
            currency: element.code ?? "",
            rate: Number.parseFloat(element.rate?.replace(",", ".") ?? "0"),
          },
        });
      }
    }
  }
}
