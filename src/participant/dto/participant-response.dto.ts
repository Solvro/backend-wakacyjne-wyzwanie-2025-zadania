import { IsNumber, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty({
    description: "The unique identifier of the participant",
    example: 1,
  })
  @IsNumber()
  participant_id: number;

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
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: "The phone number of the participant",
    example: "+1234567890",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: "The trip IDs associated with the participant",
    isArray: true,
    type: Number,
  })
  @IsOptional()
  trips?: number[];
}
