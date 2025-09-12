import { PartialType } from "@nestjs/mapped-types";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  amount?: number;
  description?: string;
  createdAt?: Date;
  tripId?: number;
}
