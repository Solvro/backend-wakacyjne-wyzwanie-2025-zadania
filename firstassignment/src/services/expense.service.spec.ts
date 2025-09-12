import type { CreateExpenseDto } from "../Dto/create-expense-dto";
import { ExpensesService } from "./expense.service";
import { ParticipantsService } from "./participant.service";
import { PrismaService } from "./prisma.service";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import type { UpdateExpenseDto } from "../Dto/update-expense-dto";
import type { Expense } from "@prisma/client";

describe('ExpenseService',() =>{
    let service: ExpensesService;
    let prisma: PrismaService;
    let participantService: ParticipantsService;

    const mockPrismaService = {
        expense: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            create: jest.fn(({data}) => ({
                id: 1,
                ...data,
            })),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            update: jest.fn(({data}) => ({
                id: 1,
                ...data,
            })),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            delete: jest.fn(({data}) => ({
                id: 1,
                ...data,
            })),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExpensesService, {provide: ParticipantsService, useValue: {participantById: jest.fn()}} , PrismaService],
        })
        .overrideProvider(PrismaService)
        .useValue(mockPrismaService)
        .compile();

        service = module.get<ExpensesService>(ExpensesService);
        participantService = module.get<ParticipantsService>(ParticipantsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create an expense', async() => {
        const dto:CreateExpenseDto = {
            amount: 100,
            location: "Test location",
            participantId: 1,
        };

        (participantService.participantById as jest.Mock).mockResolvedValue(true);

        const result = await service.createExpense(dto);
        expect(result).toHaveProperty('id');
        expect(result).toEqual({
            id: expect.any(Number) as number,
            amount: 100,
            location: "Test location",
            participantId: 1,
        })
    })

    it('should find all expenses',async() => {
        const data: Expense = {
            id: 1,
            amount: 100,
            location: "Test location",
            participantId: 1,
        };

        (prisma.expense.findMany as jest.Mock).mockResolvedValue(data);


        const result = await service.allExpenses();
        expect(result).toBe(data);
    })

    it('should find an expense', async() => {
        const dto:CreateExpenseDto & {id: number} = {
            id: 1,
            amount: 100,
            location: "Test location",
            participantId: 1,
        };

        (prisma.expense.findUnique as jest.Mock).mockResolvedValue(dto);

        const result = await service.expenseById(dto.id);

        expect(result).toEqual({
            id: 1,
            amount: 100,
            location: "Test location",
            participantId: 1,
        })
    })

    it('should change an expense', async() => {
        const previousData: Expense = {
            id: 1,
            amount: 100,
            location: "Test location",
            participantId: 1,

        }
        const newData: UpdateExpenseDto = {
            amount: 200,
            location: "Next test location",
            participantId: 2,
        };

        const result = await service.updateExpense({id: previousData.id, newData})

        expect(result).toEqual({
            id: 1,
            amount: 200,
            location: "Next test location",
            participantId: 2,
        })
    })

    it('should delete an expense', async() => {
        const data: Expense = {
            id: 1,
            amount: 100,
            location: "Test location",
            participantId: 1,

        }

        const result = await service.deleteExpense(data.id);
        expect(result).toEqual({
            id: 1,
        })
    })
})