import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParticipantDto {
       @ApiProperty()
       first_name: string;
       @ApiPropertyOptional()
       second_name?: string;
       @ApiProperty()
       last_name: string;
       @ApiProperty()
       email: string;
       @ApiProperty({
	enum: Gender, description: "Gender", enumName: "Gender",
       })
       gender: Gender;
       
}
