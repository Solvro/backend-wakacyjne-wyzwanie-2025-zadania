import { ApiProperty } from "@nestjs/swagger";

export class AddParticipantDto {
  @ApiProperty({ example: 2 })
  participantId: number;
}
