import { ExpenseResponseDto } from "src/expense/dto/expense-response.dto";
import { ParticipantResponseDto } from "src/participant/dto/participant-response.dto";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { TripResponsePublicDto } from "./trip-response-public.dto";

export class TripResponsePrivateDto extends TripResponsePublicDto {
  @ApiPropertyOptional({
    description: "The list of expenses for the trip",
    isArray: true,
    type: [ExpenseResponseDto],
  })
  expenses?: ExpenseResponseDto[];

  @ApiPropertyOptional({
    description: "The list of participants in the trip",
    isArray: true,
    type: [ParticipantResponseDto],
  })
  participants?: ParticipantResponseDto[];
}
