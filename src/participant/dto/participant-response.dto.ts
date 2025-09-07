import { ApiProperty } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty({ description: "Participant ID", example: 1 })
  id: number;

  @ApiProperty({ description: "First name", example: "Jan" })
  firstName: string;

  @ApiProperty({ description: "Last name", example: "Kowalski" })
  lastName: string;

  @ApiProperty({ description: "Email", example: "jan@example.com" })
  email: string;
}
