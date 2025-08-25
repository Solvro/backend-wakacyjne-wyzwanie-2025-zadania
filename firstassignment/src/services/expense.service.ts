import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Expense, Prisma } from "../../generated/prisma";

@Injectable()
export class ExpensesService{
    constructor(private prisma: PrismaService){}

    async expenses(): Promise<Expense[]>{
        return this.prisma.expense.findMany();
    }

    async createExpense(data: Prisma.ExpenseCreateInput): Promise<Expense>{
        return this.prisma.expense.create({
            data,
        })
    }
    
    async updateExpense(parameters:{
        where: Prisma.ExpenseWhereUniqueInput;
        data: Prisma.ExpenseUpdateInput;
    }): Promise<Expense>{
        const { where, data } = parameters;
        return this.prisma.expense.update({
            data,
            where,
        })
    }

    async deleteExpense(id: number): Promise<Expense>{
        return this.prisma.expense.delete({
            where: {id}
        })
    }
}