import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { Role } from "@/lib/roles";

import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles/role.decorator";
import { RoleGuard } from "../auth/roles/role.guard";
import {
  CreatePaymentDto,
  PaymentConversionInfoDto,
  PaymentResponseDto,
  PaymentStatusDto,
  SupportedCurrency,
  UpdatePaymentStatusDto,
} from "./dto/payment.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("payments")
@ApiBearerAuth()
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({
    summary: "Create a new payment",
    description:
      "Create a payment with automatic currency conversion to PLN. The system will find or create a ForexRate record and link it to the payment for accurate exchange rate tracking.",
  })
  @ApiResponse({
    status: 201,
    description: "Payment created successfully with linked ForexRate record",
    type: PaymentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - validation failed, currency conversion error, or ForexRate record creation failed",
  })
  @ApiResponse({
    status: 404,
    description: "Trip or expense not found",
  })
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all payments",
    description: "Retrieve payments with optional filtering",
  })
  @ApiQuery({
    name: "tripId",
    required: false,
    description: "Filter by trip ID",
    type: Number,
  })
  @ApiQuery({
    name: "expenseId",
    required: false,
    description: "Filter by expense ID",
    type: Number,
  })
  @ApiQuery({
    name: "status",
    required: false,
    description: "Filter by payment status",
    enum: PaymentStatusDto,
  })
  @ApiQuery({
    name: "currency",
    required: false,
    description: "Filter by original currency",
    enum: SupportedCurrency,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Number of payments to return (max 100)",
    type: Number,
  })
  @ApiQuery({
    name: "offset",
    required: false,
    description: "Number of payments to skip",
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "Payments retrieved successfully",
    type: [PaymentResponseDto],
  })
  async getPayments(
    @Query("tripId") tripId?: number,
    @Query("expenseId") expenseId?: number,
    @Query("status") status?: PaymentStatusDto,
    @Query("currency") currency?: SupportedCurrency,
    @Query("limit") limit?: number,
    @Query("offset") offset?: number,
  ): Promise<PaymentResponseDto[]> {
    return this.paymentsService.getPayments({
      tripId,
      expenseId,
      status,
      currency,
      limit: limit !== undefined && limit <= 100 ? limit : 50,
      offset: offset ?? 0,
    });
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get payment by ID",
    description: "Retrieve a specific payment by its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Payment found",
    type: PaymentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Payment not found",
  })
  async getPaymentById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.getPaymentById(id);
  }

  @Get(":id/conversion-info")
  @ApiOperation({
    summary: "Get payment conversion information",
    description:
      "Get detailed currency conversion information for a payment, including the exchange rate from the linked ForexRate record and when it was fetched",
  })
  @ApiResponse({
    status: 200,
    description: "Conversion info retrieved with ForexRate details",
    type: PaymentConversionInfoDto,
  })
  @ApiResponse({
    status: 404,
    description: "Payment not found",
  })
  async getPaymentConversionInfo(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PaymentConversionInfoDto> {
    return this.paymentsService.getPaymentConversionInfo(id);
  }

  @Patch(":id/status")
  @ApiOperation({
    summary: "Update payment status",
    description: "Update the status of a payment",
  })
  @ApiResponse({
    status: 200,
    description: "Payment status updated successfully",
    type: PaymentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Payment not found",
  })
  async updatePaymentStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.updatePaymentStatus(id, updatePaymentStatusDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete payment",
    description: "Delete a payment by ID",
  })
  @ApiResponse({
    status: 204,
    description: "Payment deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Payment not found",
  })
  async deletePayment(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.paymentsService.deletePayment(id);
  }
}
