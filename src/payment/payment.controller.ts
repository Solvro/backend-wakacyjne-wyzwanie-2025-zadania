import { AuthGuard } from "src/auth/auth.guard";

import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentService } from "./payment.service";

@ApiTags("/payments")
@Controller("/payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Tworzy nową płatność" })
  @ApiBody({
    type: CreatePaymentDto,
    description: "Dane do stworzenia płatności",
  })
  @ApiResponse({
    status: 201,
    description: "Płatność została pomyślnie utworzona.",
  })
  @ApiResponse({ status: 400, description: "Nieprawidłowe dane wejściowe." })
  @ApiResponse({
    status: 404,
    description: "Nie znaleziono expense/participant.",
  })
  @UseGuards(AuthGuard)
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto.expense);
  }
}
