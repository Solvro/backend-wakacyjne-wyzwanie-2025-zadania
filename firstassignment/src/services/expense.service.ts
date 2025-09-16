import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Expense } from "../../generated/prisma";
import { CreateExpenseDto } from "../Dto/create-expense-dto";
import { ParticipantsService } from "./participant.service";
import { UpdateExpenseDto } from "../Dto/update-expense-dto";
import { CurrnecyService } from "./currency.service";

@Injectable()
export class ExpensesService{
    constructor(private prisma: PrismaService, private participantService: ParticipantsService, private currencyService: CurrnecyService){}

    async expenseById(id: number){
        return this.prisma.expense.findUnique({where: {id}});
    }

    async allExpenses(): Promise<Expense[]>{
        return this.prisma.expense.findMany();
    }

    async createExpense(data: CreateExpenseDto): Promise<Expense>{
        const participant = await this.participantService.participantById(data.participantId);
        if(participant === null){
            throw new NotFoundException(`Uczestnik z ID ${data.participantId.toString()} nie istnieje`);
        }
        else{
            const currency = await this.currencyService.currencyByName(data.currency);
            if(currency === null){
                throw new NotFoundException('Nie znaleziono waluty');
            }
            else{
                return this.prisma.expense.create({
                    data: {
                        amount: data.amount * currency.rate,
                        location: data.location,
                        participantId: data.participantId,
                    }
                })
            }
            
        }
    }
    
    async updateExpense(parameters:{
        id: number;
        newData: UpdateExpenseDto;
    }){
        const { id, newData } = parameters;
        const expense = await this.expenseById(id);
        if(newData.participantId !== undefined){
            const participant = await this.participantService.participantById(newData.participantId);
            if(participant === null){
                throw new NotFoundException(`Uczestnik z ID ${newData.participantId.toString()} nie istnieje`);
            }
        }
        if(expense === null){
            throw new NotFoundException(`Wydatek z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.expense.update({
                data: newData,
                where: {id},
            })
        }
    }

    async deleteExpense(id: number){
        const expense = await this.expenseById(id);
        if(expense === null){
            throw new NotFoundException(`Wydatek z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.expense.delete({
                where: {id}
            })
        }
    }
}