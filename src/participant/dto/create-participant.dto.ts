import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  Name: string;

  @ApiPropertyOptional()
  Email?: string;

  @ApiProperty()
  Date_of_birth: Date;

  @ApiProperty()
  Trip_id: number;
}
