import { Validate } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Currency } from "../../validators/valid-currency.validator";

export class CurrencySelectDTO {
  @ApiProperty()
  @Validate(Currency)
  currency: string;
}
