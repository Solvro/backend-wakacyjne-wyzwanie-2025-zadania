import { ParticipantRole } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class ParticipantResponseDto {
  @ApiProperty({ example: 1 }) id: number;
  @ApiProperty({ example: 42 }) tripId: number;
  @ApiProperty({ example: "Janusz Tracz" }) name: string;
  @ApiProperty({ enum: ParticipantRole, example: ParticipantRole.MEMBER })
  role: ParticipantRole;
  @ApiProperty({ example: "2025-08-31T21:37:56.000Z" }) joinedAt: string;
  @ApiProperty({ example: "1000.00" }) share: string;
}
