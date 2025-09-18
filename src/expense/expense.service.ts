/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CurrencyService } from "../currency/currency.service";
import { DatabaseService } from "../database/database.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(
    private database: DatabaseService,
    private currency: CurrencyService,
  ) {}
  async create(createExpenseDto: CreateExpenseDto) {
    const ogAmount = createExpenseDto.original_amount;
    const ogCurrency = createExpenseDto.original_currency;

    if ((ogAmount != null) !== (ogCurrency != null)) {
      throw new BadRequestException(
        "Przy original_amount musi być original_currency",
      );
    }

    if (ogAmount == null && ogCurrency == null) {
      return this.database.expense.create({ data: createExpenseDto });
    }

    const exchangeRate = await this.currency.find_most_recent_rate(ogCurrency!);

    if (exchangeRate == null) {
      throw new BadRequestException("Podana waluta nie jest obsługiwana");
    }

    const convertedAmount = ogAmount! * exchangeRate;

    const expenseData = {
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...createExpenseDto,
      amount: convertedAmount,
    };

    return this.database.expense.create({ data: expenseData });
  }

  async findAll() {
    return this.database.expense.findMany();
  }

  async findOne(id: number) {
    return this.database.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.database.expense.findUnique({
      where: { id },
    });

    if (existingExpense == null) {
      throw new NotFoundException(`Wydatek o danym ID nie istnieje`);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    const updateData = { ...updateExpenseDto };

    if (
      updateExpenseDto.original_currency !== undefined ||
      updateExpenseDto.original_amount !== undefined
    ) {
      const newCurrency =
        updateExpenseDto.original_currency ?? existingExpense.original_currency;
      const newAmount =
        updateExpenseDto.original_amount ?? existingExpense.original_amount;

      if (newCurrency != null && newAmount !== null) {
        const exchangeRate =
          await this.currency.find_most_recent_rate(newCurrency);
        if (exchangeRate == null) {
          throw new BadRequestException("Podaba waluta nie jest obsługiwana ");
        } else {
          updateData.amount = newAmount * exchangeRate;
          updateData.original_currency = newCurrency;
          updateData.original_amount = newAmount;
        }
      } else if (newCurrency === null) {
        updateData.amount = newAmount ?? existingExpense.amount;
        updateData.original_currency = undefined;
        updateData.original_amount = undefined;
      }
    }

    return this.database.expense.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.database.expense.delete({
      where: { id },
    });
  }
}
