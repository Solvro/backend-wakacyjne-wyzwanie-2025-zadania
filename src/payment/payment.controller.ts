import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentService } from "./payment.service";

@ApiTags("payments")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiOkResponse({ description: "Returns the created payment" })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiOkResponse({ description: "Returns a list of all payments" })
  async getPayments() {
    return this.paymentService.getPayments();
  }
}
