import { PrismaClient } from "@prisma/client";
import { load } from "cheerio";
import { Logger } from "@nestjs/common";

const logger = new Logger("NBPScraper");
const prisma = new PrismaClient();

export async function scrapeNBP() {
  const response = await fetch(
    "https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/tabela-a",
  );

  if (!response.ok) {
    logger.error(
      `Failed to fetch NBP rates. Status: ${String(
        response.status,
      )} ${response.statusText}`,
    );
    throw new Error(`NBP fetch failed with status ${String(response.status)}`);
  }

  const html = await response.text();
  const $ = load(html);

  const results: { code: string; rate: number }[] = [];

  $("table tbody tr").each((_, element) => {
    const tds = $(element).find("td");

    if (tds.length < 3) {
      logger.error("Unexpected row format, less than 3 <td> elements found.");
      throw new Error("NBP scraper failed: invalid table row structure.");
    }

    const rawCode = $(tds[1]).text().trim();
    let rawRate = $(tds[2]).text().trim();

    rawRate = rawRate.replace(",", ".");
    const rate = Number.parseFloat(rawRate);

    if (Number.isNaN(rate)) {
      logger.warn(
        `Failed to parse rate for code: "${rawCode}", rawRate: "${rawRate}"`,
      );
      return;
    }

    const parts = rawCode.split(" ");
    if (parts.length < 2) {
      logger.error(`Invalid currency code format: "${rawCode}"`);
      throw new Error("NBP scraper failed: invalid currency code format.");
    }

    const multiplier = Number.parseInt(parts[0], 10);
    const code = parts[1];

    const ratePerUnit = rate / multiplier;
    results.push({ code, rate: ratePerUnit });
  });

  const wanted = new Set(["USD", "EUR", "GBP"]);
  const filtered = results.filter((r) => wanted.has(r.code));

  if (filtered.length === 0) {
    logger.warn("No matching currency codes found in scraped data.");
  }

  let createdCount = 0;
  let updatedCount = 0;

  for (const { code, rate } of filtered) {
    const existing = await prisma.currency.findUnique({ where: { code } });

    if (existing === null) {
      await prisma.currency.create({
        data: { code, rate },
      });
      createdCount++;
    } else {
      await prisma.currency.update({
        where: { code },
        data: {
          rate,
          updatedAt: new Date(),
        },
      });
      updatedCount++;
    }
  }

  logger.log(
    `Scraper finished. Found: ${String(
      results.length,
    )} total, Filtered: ${String(filtered.length)}, Created: ${String(
      createdCount,
    )}, Updated: ${String(updatedCount)}.`,
  );
}
