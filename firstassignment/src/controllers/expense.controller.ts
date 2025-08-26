import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExpensesService } from '../services/expense.service';
import { CreateExpenseDto } from '../Dto/create-expense-dto';

@ApiTags('Wydatki')
@Controller('budzetownik')
export class ExpenseController {

    constructor(
        private readonly expenseService: ExpensesService, 
    ) {}

    @Get('expense/:id')
    @ApiOperation({description: "Zwraca wydatek"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async getWholeExpense(@Param('id') id: number){
        return this.expenseService.expense(id);
    }

    @Get('expenses')
    @ApiOperation({description: "Zwraca wszystkie wydatki"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async getWholeExpenses(){
        return this.expenseService.expenses();
    }

    @Delete('deleteExpense/:id')
    @ApiOperation({description: "Usuwa wybrany wydatek"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async deleteExpense(@Param('id') id: string){
        return this.expenseService.deleteExpense(Number.parseInt(id));
    }

    @Post('addExpense')
    @ApiOperation({description: "Dodaje nowy wydatek"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addExpense(@Body() createExpenseDto: CreateExpenseDto){
        return this.expenseService.createExpense(createExpenseDto);
    }

    @Put('updateExpense/:id')
    @ApiOperation({description: "Dodaje nowy wydatek"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async updateExpense(@Param('id') id: string, @Body() newData: CreateExpenseDto){
        const parameters = {id: Number.parseInt(id), newData}
        return this.expenseService.updateExpense(parameters);
    }
}