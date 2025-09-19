import { IsInt, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreatePaymentDto {
  @IsInt()
  tripId!: number;

  @IsOptional()
  @IsInt()
  participantId?: number;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currency!: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  amount!: string; // jakbyś pytał - chciałem floata ale coś nie działało z jakiegoś powodu
}
