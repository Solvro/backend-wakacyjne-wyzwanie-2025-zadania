import { IsBoolean, IsDateString, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateParticipantDto } from "./create-participant.dto";

export class CreateParticipantResponseDto extends CreateParticipantDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();

  @ApiProperty()
  @IsDateString()
  createdAt: string = new Date().toString();

  @ApiProperty()
  @IsBoolean()
  isArchived: boolean;
}
