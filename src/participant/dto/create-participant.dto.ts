import { AccountType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsEnum(AccountType)
  account_type: AccountType;
}
