import { TripRole } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    description: "First name of the participant",
    example: "Jan",
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: "First name must be a string" })
  @MinLength(2, { message: "First name must be at least 2 characters long" })
  @MaxLength(50, { message: "First name cannot exceed 50 characters" })
  first_name: string;

  @ApiProperty({
    description: "Last name of the participant",
    example: "Kowalski",
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: "Last name must be a string" })
  @MinLength(2, { message: "Last name must be at least 2 characters long" })
  @MaxLength(50, { message: "Last name cannot exceed 50 characters" })
  last_name: string;

  @ApiProperty({
    description: "Role of the participant in the trip",
    enum: TripRole,
    example: TripRole.ORGANIZER,
  })
  @IsEnum(TripRole, { message: "Role must be a valid enum value" })
  TripRole: TripRole;

  @ApiProperty({
    description: "Email address of the participant",
    example: "jan.kowalski@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "ID of the trip this participant belongs to",
    example: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt({ message: "Trip ID must be an integer" })
  @IsPositive({ message: "Trip ID must be a positive number" })
  trip_id: number;
}
