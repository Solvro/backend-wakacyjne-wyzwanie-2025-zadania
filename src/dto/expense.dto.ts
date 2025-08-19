import type { ExpenseCategory } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export class ExpenseDto {
  title: string;
  category?: ExpenseCategory | null;
  value?: Decimal | null;
  currency: string;
  participantId: number;
  tripId: number;
}

export class CreateExpenseDto extends ExpenseDto {
  createdAt: Date = new Date();
}

export class UpdateExpenseDto extends ExpenseDto {
  updatedAt: Date = new Date();
}

export class ExpenseResponseDto extends CreateExpenseDto {
  id: number;
}
