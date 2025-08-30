import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  tripIds?: number[];
}
