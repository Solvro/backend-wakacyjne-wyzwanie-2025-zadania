import type { Browser, Frame } from "puppeteer";
import puppeteer from "puppeteer";

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class Waluty24Scraper {
  private readonly logger = new Logger(Waluty24Scraper.name);

  constructor(private readonly url = "https://waluty24.info/") {} // wiem że mogłem wybrać inną ale ta była git, dużo lepsza niż money.pl czy bankier.pl, mniej zagnieżdżonych divów na pewno

  async scrape(
    quoteSymbols: string[],
    base = "PLN",
  ): Promise<
    { quote: string; rate: number; source?: string; collectedAt: Date }[]
  > {
    let browser: Browser | undefined;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      });
      const page = await browser.newPage();
      await page.goto(this.url, { waitUntil: "networkidle2", timeout: 60_000 });

      const frame: Frame | undefined = page.frames().find((f) => {
        const u = f.url();
        return (
          u.includes("tradingview-widget.com") &&
          u.includes("embed-widget/market-quotes")
        );
      });
      if (frame === undefined) {
        this.logger.warn(
          "nie znaleziono odpowiedniej ramki tradingview na stronie",
        );
        return [];
      }

      await frame.waitForSelector(
        ".market-quotes-widget__row, .market-quotes__row",
        {
          timeout: 30_000,
        },
      );

      const raw = await frame.evaluate(() => {
        const rows = [
          ...document.querySelectorAll(
            ".market-quotes-widget__row, .market-quotes__row",
          ),
        ];
        return rows.map((r) => {
          const symElement =
            r.querySelector(".market-quotes-widget__row__symbol") ??
            r.querySelector('[class*="symbol"]');
          const priceElement =
            r.querySelector('[class*="last"]') ??
            r.querySelector('[class*="value"]') ??
            r.querySelector('[class*="price"]') ??
            r.querySelector("td,div");

          const symText = (symElement?.textContent ?? "")
            .replaceAll(/\s+/g, "")
            .toUpperCase();
          const priceText = (priceElement?.textContent ?? "")
            .trim()
            .replace(",", ".");
          const m = /[0-9]+(?:\.[0-9]+)?/.exec(priceText);
          const value = m === null ? Number.NaN : Number.parseFloat(m[0]);
          return { sym: symText, val: value };
        });
      });

      const want = new Set(quoteSymbols.map((s) => s.toUpperCase()));
      const out: {
        quote: string;
        rate: number;
        source?: string;
        collectedAt: Date;
      }[] = [];
      const now = new Date();

      for (const q of want) {
        const direct = raw.find(
          (r) =>
            r.sym.includes(`${q}${base}`) || r.sym.includes(`${q}/${base}`),
        );
        const inverse = raw.find(
          (r) =>
            r.sym.includes(`${base}${q}`) || r.sym.includes(`${base}/${q}`),
        );

        let rate: number | null = null;
        if (direct != null && Number.isFinite(direct.val)) {
          rate = direct.val;
        } else if (
          inverse != null &&
          Number.isFinite(inverse.val) &&
          inverse.val !== 0
        ) {
          rate = 1 / inverse.val;
        }

        if (rate !== null) {
          out.push({
            quote: q,
            rate,
            source: "waluty24/tradingview",
            collectedAt: now,
          });
        }
      }
      return out;
    } finally {
      if (browser !== undefined) {
        try {
          await browser.close();
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : String(error);
          this.logger.warn(
            `puppeteer się zamknął awaryjnie. kod błędu: ${message}`,
          );
        }
      }
    }
  }
}
