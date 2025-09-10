import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseParticipantDto {
       @ApiProperty()
       first_name: string;
       @ApiPropertyOptional()
       second_name?: string;
       @ApiProperty()
       last_name: string;
       @ApiProperty({
        enum: Gender, description: "Gender of participant", enumName: "Gender",
       })
       gender: Gender;

}

