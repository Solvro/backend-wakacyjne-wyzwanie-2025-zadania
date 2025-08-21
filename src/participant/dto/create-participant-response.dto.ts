import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripResponseDto {
  @ApiProperty()
  participant_id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  birthday?: Date;

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
