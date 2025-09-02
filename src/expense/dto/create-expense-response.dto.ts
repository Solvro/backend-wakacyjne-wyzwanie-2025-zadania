import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseResponseDto {
  @ApiProperty()
  id: number;

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

  @ApiProperty()
  Created_At: Date;

  @ApiProperty()
  Updated_At: Date;
}
