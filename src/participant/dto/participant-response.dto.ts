import { ApiProperty } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty({
    description: "Unique identifier of the participant",
    example: 1,
  })
  participant_id: number;

  @ApiProperty({
    description: "First name of the participant",
    example: "Jan",
  })
  first_name: string;

  @ApiProperty({
    description: "Last name of the participant",
    example: "Kowalski",
  })
  last_name: string;

  @ApiProperty({
    description: "Email address of the participant",
    example: "jan.kowalski@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Role of the participant within the trip",
    example: "ORGANIZER",
  })
  role: string;
}
