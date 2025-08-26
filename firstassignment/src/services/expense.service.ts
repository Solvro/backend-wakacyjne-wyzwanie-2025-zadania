import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Expense } from "../../generated/prisma";
import { CreateExpenseDto } from "src/Dto/create-expense-dto";
import { ParticipantsService } from "./participant.service";

@Injectable()
export class ExpensesService{
    constructor(private prisma: PrismaService, private participantService: ParticipantsService){}

    async expense(id: number): Promise<Expense>{
        return this.prisma.expense.findFirstOrThrow({where: {id}});
    }

    async expenses(): Promise<Expense[]>{
        return this.prisma.expense.findMany();
    }

    async createExpense(data: CreateExpenseDto): Promise<void>{
        await this.participantService.participant(data.participantId)
        .catch((error: unknown) => {console.error(error)})
        .finally(async () => {
            return this.prisma.expense.create({
                data: {
                    amount: data.amount,
                    location: data.location,
                    participantId: data.participantId,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            })
        })
    }
    
    async updateExpense(parameters:{
        id: number;
        newData: CreateExpenseDto;
    }): Promise<Expense>{
        const { id, newData } = parameters;
        return this.prisma.expense.update({
            data: {
                amount: newData.amount,
                location: newData.location,
                participantId: newData.participantId,
                updated_at: new Date(),
            },
            where: {id},
        })
    }

    async deleteExpense(id: number): Promise<Expense>{
        return this.prisma.expense.delete({
            where: {id}
        })
    }
}