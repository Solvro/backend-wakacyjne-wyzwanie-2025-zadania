import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PersonResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name?: string | null;

  @ApiPropertyOptional()
  email?: string | null;

  @ApiPropertyOptional()
  birthday?: Date | null;
}
