import { Currency } from "@prisma/client";
import { IsEnum, IsNumber } from "class-validator";

import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PaymentService } from "./payment.service";

class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsEnum(Currency, { message: "currency must be one of USD, EUR, SEK" })
  currency: Currency;
}

@Controller("payments")
@ApiTags("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({
    summary: "Create a payment and convert to PLN",
    description:
      "Create a payment with specified amount and currency, then convert it to PLN",
  })
  @ApiResponse({
    status: 201,
    description: "Payment created successfully",
  })
  async create(@Body() body: CreatePaymentDto) {
    const { amount, currency } = body;
    return this.paymentService.createPayment(amount, currency);
  }
}
