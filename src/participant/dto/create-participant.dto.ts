import { IsEmail, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    description: "The first name of the participant",
    example: "John",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "The last name of the participant",
    example: "Doe",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "The email of the participant",
    example: "john.doe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: "The phone number of the participant",
    example: "+1234567890",
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
