import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  Name: string;

  @ApiPropertyOptional()
  Description?: string;

  @ApiProperty()
  Value: number;

  @ApiProperty()
  Trip_id: number;

  @ApiProperty()
  Participant_id: number;
}
