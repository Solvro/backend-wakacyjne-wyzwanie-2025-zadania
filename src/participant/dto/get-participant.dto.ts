import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetParticipantDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
