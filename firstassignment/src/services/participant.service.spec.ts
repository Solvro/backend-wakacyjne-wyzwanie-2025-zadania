import { PrismaService } from "./prisma.service";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import type { Participant } from "@prisma/client";
import { TripsService } from "./trip.service";
import { ParticipantsService } from "./participant.service";
import type { CreateParticipantDto } from "../Dto/create-participant-dto";
import { Gender } from "../../generated/prisma/client";
import type { UpdateParticipantDto } from "../Dto/update-participant-dto";

describe('ExpenseService',() =>{
    let service: ParticipantsService;
    let prisma: PrismaService;
    let tripService: TripsService;

    const mockPrismaService = {
        participant: {
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
            providers: [ParticipantsService, {provide: TripsService, useValue: {tripById: jest.fn()}} , PrismaService],
        })
        .overrideProvider(PrismaService)
        .useValue(mockPrismaService)
        .compile();

        service = module.get<ParticipantsService>(ParticipantsService);
        tripService = module.get<TripsService>(TripsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should create an participant', async() => {
        const dto:CreateParticipantDto = {
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        };

        (tripService.tripById as jest.Mock).mockResolvedValue(true);

        const result = await service.createParticipant(dto);
        expect(result).toHaveProperty('id');
        expect(result).toEqual({
            id: expect.any(Number) as number,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        })
    })

    it('should find all participants',async() => {
        const data: Participant = {
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        };

        (prisma.participant.findMany as jest.Mock).mockResolvedValue(data);


        const result = await service.allParticipants();
        expect(result).toBe(data);
    })

    it('should find a participant', async() => {
        const dto:CreateParticipantDto & {id: number} = {
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        };

        (prisma.participant.findUnique as jest.Mock).mockResolvedValue(dto);

        const result = await service.participantById(dto.id);

        expect(result).toEqual({
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        })
    })

    it('should change a participant', async() => {
        const previousData: Participant = {
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        }
        const newData: UpdateParticipantDto = {
            imie: "example2",
            nazwisko: "example2",
            gender: Gender.FEMALE,
            isVegan: true,
            tripId: 2,
        };

        const result = await service.updateParticipant({id: previousData.id, newData})

        expect(result).toEqual({
            id: 1,
            imie: "example2",
            nazwisko: "example2",
            gender: Gender.FEMALE,
            isVegan: true,
            tripId: 2,
        })
    })

    it('should delete a participant', async() => {
        const data: Participant = {
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        }

        const result = await service.deleteParticipant(data.id);
        expect(result).toEqual({
            id: 1,
        })
    })
})