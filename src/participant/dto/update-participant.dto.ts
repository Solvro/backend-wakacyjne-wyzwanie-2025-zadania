import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

import { CreateParticipantDto } from "./create-participant.dto";

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  surname?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  tripId?: number;

  @ApiPropertyOptional({
    enum: Gender,
    description: "Gender of participant",
    enumName: "Gender",
  })
  gender?: Gender;
}
