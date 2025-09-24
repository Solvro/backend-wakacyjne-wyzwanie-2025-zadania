import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  async getAllPayments() {
    return this.paymentsService.getAllPayments();
  }

  @Get(":id")
  async getPaymentById(@Param("id") id: string) {
    return this.paymentsService.getPaymentById(+id);
  }
}
