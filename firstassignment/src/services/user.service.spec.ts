import { UserService } from "./user.service";
import { PrismaService } from "./prisma.service";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";

describe('UserService', () => {
    let service: UserService;
    let _prisma: PrismaService;

    const mockPrismaService = {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            create: jest.fn(({data}) => ({
                id: Date.now(),
                ...data,
            })),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService],
        })
        .overrideProvider(PrismaService)
        .useValue(mockPrismaService)
        .compile();

        service = module.get<UserService>(UserService);
        _prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create a user', async() => {
        mockPrismaService.user.findUnique.mockResolvedValue(null);
        
        const dto = {
            username: "example",
            email: "example@example.com",
            password: "examplePassword",
        }
        const result = await service.createUser(dto);
        expect(result.username).toBe('example');
        expect(result).toEqual({
            username: "example",
            email: "example@example.com",
        })
    })    

});