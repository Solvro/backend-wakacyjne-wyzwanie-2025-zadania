import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentResponseDto } from "./dto/payment-response.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("payments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("payments")
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Przelicz na złotówki po aktualnym kursie" })
  @ApiCreatedResponse({ type: PaymentResponseDto })
  async create(@Body() dto: CreatePaymentDto) {
    return this.payments.create(dto);
  }
}
