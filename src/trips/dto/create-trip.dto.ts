import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { IsAfter } from "../../common/validators/is-after-validator";

enum TripStatus {
  PLANNED = "PLANNED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class CreateTripDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsEnum(TripStatus)
  status?: TripStatus;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  @IsAfter("startDate", {
    allowEqual: true,
    message: "endDate must be on/after startDate",
  })
  endDate?: string;

  @IsOptional()
  @IsNumberString()
  budget?: string;
}
