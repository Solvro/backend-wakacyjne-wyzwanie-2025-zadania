import { Test } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import { ExpenseController } from "./expense.controller"
import { ExpensesService } from "../services/expense.service";
import type { CreateExpenseDto } from "../Dto/create-expense-dto";
import { AuthService } from "../services/auth.service";


describe('ExpenseContoller',() => {
    let controller: ExpenseController;

    const mockExpenseService = {
        createExpense: jest.fn((dto) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return{
                id: 1,
                ...dto
            }
        }),

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        updateExpense: jest.fn((parameters: {id: number, newData}) => ({
            id: parameters.id,
            ...parameters.newData,
        })),

        expenseById: jest.fn((id: number) => {
            if(id === 1 ){
                return {
                    amount: 100,
                    location: "example",
                    participantId: 1,
                }
            }
            return null
        }),

        deleteExpense: jest.fn((id: number) => {
            return id
        }),

        allExpenses: jest.fn(() => {
            return [{
                    amount: 100,
                    location: "example",
                    participantId: 1,
                }]
        })

    }

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpenseController],
            providers: [ExpensesService,{provide: AuthService, useValue: {validateToken: jest.fn()}}],
        })
        .overrideProvider(ExpensesService)
        .useValue(mockExpenseService)
        .compile();

        controller = module.get<ExpenseController>(ExpenseController);
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('should create an expense',async () => {
        const dto: CreateExpenseDto = {
            amount: 100,
            location: "example",
            participantId: 1,
        }
        const response = await controller.addExpense(dto)
        expect(response).toEqual({
            id: 1,
            amount: 100,
            location: "example",
            participantId: 1,
        });

        expect(mockExpenseService.createExpense).toHaveBeenCalledWith(dto);
    })

    it('should update an expense', async () => {
        const dto = {
            amount: 200,
            location: "example2",
            participantId: 2,
        }


        const response = await controller.updateExpense("1",dto);

        expect(response).toEqual({
            id: 1,
            amount: 200,
            location: "example2",
            participantId: 2,
        });

        expect(mockExpenseService.updateExpense).toHaveBeenCalled();

    })

    it('should delete an expense', async () => {
        const id = "1";

        const response = await controller.deleteExpense(id);
        expect(response).toEqual(1)

        expect(mockExpenseService.deleteExpense).toHaveBeenCalled();

    })

    it('should return an array of expenses', async () => {
        const response = await controller.getWholeExpenses();
        expect(response).toEqual([{
            amount: 100,
            location: "example",
            participantId: 1,
        }])
    })

});