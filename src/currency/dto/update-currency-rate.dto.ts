import { PartialType } from "@nestjs/swagger";

import { CreateCurrencyRateDto } from "./create-currency-rate.dto";

export class UpdateCurrencyRateDto extends PartialType(CreateCurrencyRateDto) {}
