import { ExpenseCategory } from "@prisma/client";

export class CreateExpenseDto {
  description: string;
  amount: number;
  category: ExpenseCategory;
  date?: string;
  tripId: number;
  paidByParticipantId: number;
}
