import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name?: string | null;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  birthday?: Date | null;
}
