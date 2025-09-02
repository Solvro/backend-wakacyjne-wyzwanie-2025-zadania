import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  Name: string;

  @ApiPropertyOptional()
  Email?: string;

  @ApiProperty()
  Date_of_birth: Date;

  @ApiProperty()
  Trip_id: number;

  @ApiProperty()
  Created_At: Date;

  @ApiProperty()
  Updated_At: Date;
}
