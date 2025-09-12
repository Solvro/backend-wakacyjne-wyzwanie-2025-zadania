import { PrismaService } from "./prisma.service";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import type { Trip } from "@prisma/client";
import { TripsService } from "./trip.service";
import type { CreateTripDto } from "../Dto/create-trip-dto";
import type { UpdateTripDto } from "../Dto/update-trip-dto";

describe('ExpenseService',() =>{
    let service: TripsService;
    let prisma: PrismaService;

    const mockPrismaService = {
        trip: {
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
            providers: [TripsService , PrismaService],
        })
        .overrideProvider(PrismaService)
        .useValue(mockPrismaService)
        .compile();

        service = module.get<TripsService>(TripsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create a trip', async() => {
        const dto: CreateTripDto = {
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        };

        const result = await service.createTrip(dto);
        expect(result).toHaveProperty('id');
        expect(result).toEqual({
            id: expect.any(Number) as number,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        })
    })

    it('should find all trips',async() => {
        const data: Trip = {
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            location: "example",
        };

        (prisma.trip.findMany as jest.Mock).mockResolvedValue(data);


        const result = await service.allTrips();
        expect(result).toBe(data);
    })

    it('should find a trip', async() => {
        const dto:CreateTripDto & {id: number} = {
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        };

        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(dto);

        const result = await service.tripById(dto.id);

        expect(result).toEqual({
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        })
    })

    it('should change an trip', async() => {
        const previousData: Trip = {
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            location: "example",
        }
        const newData: UpdateTripDto = {
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            location: "next example",
        };

        const result = await service.updateTrip({id: previousData.id, newData})

        expect(result).toEqual({
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            location: "next example",
        })
    })

    it('should delete an trip', async() => {
        const data: Trip = {
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            location: "example",
        }

        const result = await service.deleteTrip(data.id);
        expect(result).toEqual({
            id: 1,
        })
    })
})