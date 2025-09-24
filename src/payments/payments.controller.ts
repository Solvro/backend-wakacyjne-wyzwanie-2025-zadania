import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentResponseDto } from "./dto/payment-response.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
@ApiTags("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({
    status: 201,
    description: "Payment created successfully.",
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 400, description: "Unsupported or invalid currency." })
  async create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({
    status: 200,
    description: "List of all payments retrieved successfully.",
  })
  async getAll() {
    return this.paymentsService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a payment by ID" })
  @ApiResponse({
    status: 200,
    description: "Payment details retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "Payment not found." })
  async getOne(@Param("id") id: string) {
    return this.paymentsService.getOne(Number(id));
  }
}
