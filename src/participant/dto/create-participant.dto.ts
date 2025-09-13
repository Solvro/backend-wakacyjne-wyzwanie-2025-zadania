import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiProperty()
  email: string;
}
