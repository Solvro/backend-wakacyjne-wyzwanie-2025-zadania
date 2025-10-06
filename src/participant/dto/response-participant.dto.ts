import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class ResponseParticipantDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  surname: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNumber()
  tripId: number;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  userEmail?: string;

  @ApiPropertyOptional({
    enum: Gender,
    description: "Gender of participant",
    enumName: "Gender",
  })
  gender?: Gender;
}
