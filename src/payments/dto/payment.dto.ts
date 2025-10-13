import { Transform } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum SupportedCurrency {
  PLN = "PLN",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum PaymentStatusDto {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export class CreatePaymentDto {
  @ApiProperty({
    description: "Payment title/description",
    example: "Hotel booking payment",
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: "Title must be a string" })
  @MinLength(1, { message: "Title cannot be empty" })
  @MaxLength(100, { message: "Title must not exceed 100 characters" })
  title: string;

  @ApiPropertyOptional({
    description: "Additional payment description",
    example: "Payment for 3-night stay at Grand Hotel",
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: "Description must be a string" })
  @MaxLength(500, { message: "Description must not exceed 500 characters" })
  description?: string;

  @ApiProperty({
    description: "Payment amount in original currency",
    example: 250.5,
    minimum: 0.01,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Amount must be a number with up to 2 decimal places" },
  )
  @IsPositive({ message: "Amount must be positive" })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? Number.parseFloat(value) : value,
  )
  originalAmount: number;

  @ApiProperty({
    description: "Currency code for the payment",
    example: "USD",
    enum: SupportedCurrency,
    enumName: "SupportedCurrency",
  })
  @IsEnum(SupportedCurrency, {
    message: "Currency must be one of: PLN, USD, EUR, GBP",
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.toUpperCase() : value,
  )
  originalCurrency: SupportedCurrency;

  @ApiPropertyOptional({
    description: "Associated trip ID (optional)",
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: "Trip ID must be an integer" })
  @IsPositive({ message: "Trip ID must be positive" })
  tripId?: number;

  @ApiPropertyOptional({
    description: "Associated expense ID (optional)",
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: "Expense ID must be an integer" })
  @IsPositive({ message: "Expense ID must be positive" })
  expenseId?: number;
}

export class PaymentResponseDto {
  @ApiProperty({
    description: "Unique payment identifier",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Payment title",
    example: "Hotel booking payment",
  })
  title: string;

  @ApiPropertyOptional({
    description: "Payment description",
    example: "Payment for 3-night stay at Grand Hotel",
  })
  description?: string;

  @ApiProperty({
    description: "Original payment amount",
    example: 250.5,
  })
  originalAmount: number;

  @ApiProperty({
    description: "Original currency code",
    example: "USD",
    enum: SupportedCurrency,
    enumName: "SupportedCurrency",
  })
  originalCurrency: SupportedCurrency;

  @ApiProperty({
    description: "Amount converted to PLN",
    example: 1032.05,
  })
  plnAmount: number;

  @ApiPropertyOptional({
    description:
      "Exchange rate used for conversion (retrieved from ForexRate table, 1.0 for PLN payments)",
    example: 4.1282,
  })
  exchangeRate?: number;

  @ApiProperty({
    description: "Payment status",
    example: "COMPLETED",
    enum: PaymentStatusDto,
    enumName: "PaymentStatusDto",
  })
  status: PaymentStatusDto;

  @ApiPropertyOptional({
    description: "When payment was processed",
    example: "2025-09-20T14:30:00.000Z",
  })
  processedAt?: string;

  @ApiProperty({
    description: "Payment creation timestamp",
    example: "2025-09-20T10:30:00.000Z",
  })
  createdAt: string;

  @ApiProperty({
    description: "Last update timestamp",
    example: "2025-09-20T14:30:00.000Z",
  })
  updatedAt: string;

  @ApiPropertyOptional({
    description: "Associated trip ID",
    example: 1,
  })
  tripId?: number;

  @ApiPropertyOptional({
    description: "Associated expense ID",
    example: 1,
  })
  expenseId?: number;
}

export class UpdatePaymentStatusDto {
  @ApiProperty({
    description: "New payment status",
    example: "COMPLETED",
    enum: PaymentStatusDto,
    enumName: "PaymentStatusDto",
  })
  @IsEnum(PaymentStatusDto, {
    message: "Status must be one of: PENDING, COMPLETED, FAILED, CANCELLED",
  })
  status: PaymentStatusDto;
}

export class PaymentConversionInfoDto {
  @ApiProperty({
    description: "Original amount and currency",
    example: "250.50 USD",
  })
  originalAmount: string;

  @ApiProperty({
    description: "Converted PLN amount",
    example: "1032.05 PLN",
  })
  plnAmount: string;

  @ApiProperty({
    description: "Exchange rate used for conversion (from ForexRate record)",
    example: 4.1282,
  })
  exchangeRate: number;

  @ApiProperty({
    description:
      "Timestamp when the exchange rate was fetched from external API",
    example: "2025-09-20T10:30:00.000Z",
  })
  rateTimestamp: string;

  @ApiProperty({
    description: "Conversion performed at",
    example: "2025-09-20T10:35:00.000Z",
  })
  convertedAt: string;
}
