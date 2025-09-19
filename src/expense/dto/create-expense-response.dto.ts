export class CreateExpenseResponseDto {
  tripId!: number;
  expenseAmount!: number;
  expenseDescription?: string;
  currencyCode?: string;
}
