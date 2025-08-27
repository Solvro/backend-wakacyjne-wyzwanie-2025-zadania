import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  title: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;

  @ApiPropertyOptional({
    isArray: true,
  })
  expenses?: unknown[];

  @ApiPropertyOptional({
    isArray: true,
  })
  participants?: unknown[];
}
