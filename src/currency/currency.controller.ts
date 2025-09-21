import { PrismaClient } from "@prisma/client";

import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

const prisma = new PrismaClient();

@ApiTags("currency")
@Controller("currency")
export class CurrencyController {
  @Get()
  @ApiOperation({ summary: "Get all currencies" })
  @ApiOkResponse({ description: "Returns a list of all currencies" })
  async getCurrencies() {
    return prisma.currency.findMany({
      orderBy: { code: "asc" },
    });
  }
}
