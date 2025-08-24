export class CreateExpenseDto {
  tripId!: number;
  expenseAmount!: number;
  address!: string;
  expenseDescription?: string;
}
