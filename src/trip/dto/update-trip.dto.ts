import { Type } from "class-transformer";
import { IsDate, IsDefined, IsString, Validate } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

import { NotFuture } from "../../Validators/not-future.validator";
import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  start: Date;

  @Type(() => Date)
  @Validate(NotFuture)
  @IsDate()
  @ApiProperty()
  end: Date;
}
