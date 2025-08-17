import type { ExpenseCategory } from "@prisma/client";

export class CreateExpenseDto {
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  participantId: number;
}
