import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ParticipantDto {
  @ApiProperty({
    description: "Name of the participant",
    example: "John Doe",
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: "Name must be a string" })
  @MinLength(1, { message: "Name cannot be empty" })
  @MaxLength(100, { message: "Name must not exceed 100 characters" })
  name: string;

  @ApiProperty({
    description: "Email address of the participant",
    example: "john.doe@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiPropertyOptional({
    description: "Phone number of the participant",
    example: "+48123456789",
  })
  @IsOptional()
  @IsString({ message: "Phone number must be a string" })
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message:
      "Phone number must be a valid international format (e.g., +48123456789)",
  })
  phone?: string;

  @ApiPropertyOptional({
    description: "Whether the participant is an organizer",
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: "isOrganizer must be a boolean value" })
  isOrganizer?: boolean;
}
