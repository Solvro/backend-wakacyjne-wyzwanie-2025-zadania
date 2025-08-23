import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  Destination: string;

  @ApiPropertyOptional()
  Description?: string;

  @ApiProperty()
  Start_Date: Date;

  @ApiProperty()
  End_Date: Date;

  @ApiProperty()
  Created_At: Date;

  @ApiProperty()
  Updated_At: Date;
}
