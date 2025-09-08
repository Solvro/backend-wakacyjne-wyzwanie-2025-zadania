import { ApiProperty } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  amountToPay: number;
  @ApiProperty()
  tripId: number;
}
