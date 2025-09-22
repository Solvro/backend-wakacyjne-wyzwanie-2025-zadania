import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/role.decorator";
import { RoleGuard } from "src/auth/roles/role.guard";
import { UserMetadata } from "src/user/dto/user-metadata";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
@ApiTags("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create payment" })
  @ApiResponse({
    status: 201,
    description: "The payment has been created.",
    type: CreatePaymentDto,
  })
  @ApiResponse({
    status: 404,
    description: "User or Trip not found.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Request()
    request: {
      user: UserMetadata;
    },
  ) {
    return await this.paymentsService.create(
      request.user.email,
      createPaymentDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get payments",
    description: "Return all peyments.",
  })
  @ApiResponse({
    status: 200,
    description: "The payment has been returned.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.paymentsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get payment",
    description: "Return  peyment by id.",
  })
  @ApiResponse({
    status: 200,
    description: "The payment has been returned.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.paymentsService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete payment",
    description: "Delete payment",
  })
  @ApiResponse({
    status: 200,
    description: "The payment has been deleted.",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.paymentsService.remove(+id);
  }
}
