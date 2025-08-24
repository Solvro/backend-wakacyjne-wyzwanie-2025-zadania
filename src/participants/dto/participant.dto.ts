import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty({
    description: "Name of the participant",
    example: "John Doe",
  })
  name: string;

  @ApiProperty({
    description: "Email address of the participant",
    example: "john.doe@example.com",
  })
  email: string;

  @ApiPropertyOptional({
    description: "Phone number of the participant",
    example: "+48123456789",
  })
  phone?: string;

  @ApiPropertyOptional({
    description: "Whether the participant is an organizer",
    example: false,
  })
  isOrganizer?: boolean;
}
