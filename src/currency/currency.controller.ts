import { Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('currency')
export class CurrencyController {
  @Get()
  async getCurrencies() {
    return prisma.currency.findMany({
      orderBy: { code: 'asc' },
    });
  }
}
