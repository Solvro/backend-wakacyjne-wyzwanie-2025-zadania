import { CurrencyName } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class PaymentService {
  constructor(private database: DatabaseService) {}

  async create(expense: number) {
    let rateValue: number;
    const response = await this.database.expense.findFirst({
      where: { expense_id: expense },
    });
    if (response == null) {
      throw new NotFoundException("No expense with this id in database");
    }
    if (response.paid === true) {
      throw new BadRequestException("Expense already paid");
    }
    const date = response.date;
    date.setHours(2, 0, 0, 0);
    const currency_name: CurrencyName = response.currency;
    if (currency_name === "PLN") {
      rateValue = 1;
    } else {
      const responseRate = await this.database.currency.findFirst({
        where: { timeStamp: date, currency: currency_name },
      });
      rateValue = Number(responseRate?.value);
    }
    const amount_value = Number(response.amount);
    if (Number.isNaN(rateValue) || Number.isNaN(amount_value)) {
      throw new NotFoundException("Invalid numeric values for rate or amount");
    }
    const amountPLN_value: number = amount_value * rateValue;
    const today = new Date();
    today.setHours(2, 0, 0, 0);
    await this.database.expense.update({
      where: { expense_id: expense },
      data: { paid: true },
    });
    return await this.database.payments.create({
      data: {
        date: today,
        currency: currency_name,
        amount: amount_value,
        amountPLN: amountPLN_value,
        expense: {
          connect: { expense_id: expense },
        },
      },
    });
  }
}
