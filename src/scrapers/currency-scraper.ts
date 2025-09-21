import { load } from 'cheerio';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function scrapeNBP() {
  const response = await fetch('https://nbp.pl/statystyka-i-sprawozdawczosc/kursy/tabela-a');
  const html = await response.text();

  const $ = load(html);

  const results: { code: string; rate: number }[] = [];

  $('table tbody tr').each((_, element) => {
    const tds = $(element).find('td');
    const rawCode = $(tds[1]).text().trim();
    let rawRate = $(tds[2]).text().trim();

    rawRate = rawRate.replace(',', '.');
    const rate = Number.parseFloat(rawRate);

    if (!Number.isNaN(rate)) {
      const parts = rawCode.split(' ');
      const multiplier = Number.parseInt(parts[0], 10);
      const code = parts[1];

      const ratePerUnit = rate / multiplier;

      results.push({ code, rate: ratePerUnit });
    }
  });

  const wanted = new Set(['USD', 'EUR', 'GBP']);
  const filtered = results.filter(r => wanted.has(r.code));

  for (const { code, rate } of filtered) {
    const existing = await prisma.currency.findUnique({ where: { code } });

    if (existing) {
      await prisma.currency.update({
        where: { code },
        data: {
          rate,
          updatedAt: new Date(), 
        },
      });
    } else {
      await prisma.currency.create({
        data: { code, rate },
      });
    }
  }
}
