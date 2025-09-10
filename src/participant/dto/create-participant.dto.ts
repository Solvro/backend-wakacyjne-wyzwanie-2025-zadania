import type { Sex } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiPropertyOptional({ isArray: false })
  sex?: Sex;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;
}
