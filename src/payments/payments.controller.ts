import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreatePaymentResponseDTO } from "./dto/create-payment-response.dto";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
@ApiTags("payments")
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create new payment",
    description:
      "Create new payment and using the available data assign value in pln",
  })
  @ApiResponse({
    status: 201,
    description: "Created the payment succesfully",
  })
  async create(
    @Body() data: CreatePaymentDTO,
  ): Promise<CreatePaymentResponseDTO> {
    return await this.service.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get all payments",
    description: "Retrieve a list of all payments",
  })
  @ApiResponse({
    status: 200,
    description: "List of payments retrieved successfully",
    type: [CreatePaymentResponseDTO],
  })
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get payment by ID",
    description: "Retrieve details of a specific payment using its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Payment details retrieved successfullu",
    type: CreatePaymentResponseDTO,
  })
  async findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }
}
