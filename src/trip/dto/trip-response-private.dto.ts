import { ApiPropertyOptional } from "@nestjs/swagger";

import { ExpenseResponseDto } from "../../expense/dto/expense-response.dto";
import { ParticipantResponseDto } from "../../participant/dto/participant-response.dto";
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
