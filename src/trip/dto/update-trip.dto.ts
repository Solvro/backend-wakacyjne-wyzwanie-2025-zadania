import { Type } from "class-transformer";
import { IsDate, IsDefined, IsInt, IsString, Validate } from "class-validator";
import { NotFuture } from "src/Validators/not-future.validator";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsDefined()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  start: Date;

  @Validate(NotFuture)
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  end: Date;
}
