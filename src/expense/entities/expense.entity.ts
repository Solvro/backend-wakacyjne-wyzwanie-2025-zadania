import { ExpenseCategory } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

class TripInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

class ParticipantInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class ExpenseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ enum: ExpenseCategory })
  category: ExpenseCategory;

  @ApiProperty({ type: TripInfo })
  trip: TripInfo;

  @ApiProperty({ type: ParticipantInfo })
  paidBy: ParticipantInfo;
}
