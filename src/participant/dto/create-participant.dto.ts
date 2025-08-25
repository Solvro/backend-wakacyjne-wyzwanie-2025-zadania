import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  age: number;

  @ApiPropertyOptional()
  phone_num?: string;

  @ApiPropertyOptional()
  email?: string;
}
