import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantResponseDto {
  @ApiProperty()
  participant_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({
    isArray: true,
  })
  expenses?: unknown[];

  @ApiPropertyOptional({
    isArray: true,
  })
  trips?: unknown[];
}
