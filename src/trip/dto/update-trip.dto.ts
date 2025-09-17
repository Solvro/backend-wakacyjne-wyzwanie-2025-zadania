import { Type } from "class-transformer";
import { IsDate, IsDefined, IsInt, IsString, Validate } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";

import { NotFuture } from "../../Validators/not-future.validator";
import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsDefined()
  @IsInt()
  id: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  start: Date;

  @Validate(NotFuture)
  @IsDate()
  @Type(() => Date)
  end: Date;
}
