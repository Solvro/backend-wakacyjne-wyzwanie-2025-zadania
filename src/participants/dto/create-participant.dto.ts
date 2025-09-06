import { ParticipantRole } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({ description: "ID tripu", example: 42 })
  @IsInt()
  @Type(() => Number)
  tripId: number;

  @ApiProperty({ description: "Imię i nazwisko", example: "Janusz Tracz" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Rola",
    enum: ParticipantRole,
    default: ParticipantRole.MEMBER,
  })
  @IsEnum(ParticipantRole)
  role: ParticipantRole;

  @ApiProperty({ description: "Udział w kosztach", example: 100 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  share: number;
}
