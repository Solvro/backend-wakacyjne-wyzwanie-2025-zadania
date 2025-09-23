import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PaymentsService } from "./payments.service";

@ApiTags("payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @ApiOperation({ summary: "Convert currency to PLN" })
  @ApiResponse({
    status: 200,
    description: "Converted amount in PLN",
    type: Number,
  })
  @ApiResponse({ status: 404, description: "Currency not found" })
  @Get(":from/:value")
  async convertToPLN(
    @Param("from") from: string,
    @Param("value", ParseIntPipe) value: number,
  ): Promise<{ convertedAmount: number } | null> {
    const rate = await this.service.getRate(from);
    if (rate === null) {
      return null;
    }
    return { convertedAmount: value * rate.average };
  }
}
