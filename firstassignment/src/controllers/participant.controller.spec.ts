import { Gender } from "../../generated/prisma/client";
import { ParticipantController } from "./participant.controller"
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { ParticipantsService } from "../services/participant.service";
import { AuthService } from "../services/auth.service";
import type { CreateParticipantDto } from "../Dto/create-participant-dto";


describe('ParticipantController', () => {
    let controller: ParticipantController;

    const mockParticipantService = {
        createParticipant: jest.fn((dto) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return{
                id: 1,
                ...dto
            }
        }),

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        updateParticipant: jest.fn((parameters: {id: number, newData}) => ({
            id: parameters.id,
            ...parameters.newData,
        })),

        participantById: jest.fn((id: number) => {
            if(id === 1 ){
                return {
                    imie: "example",
                    nazwisko: "example",
                    gender: Gender.MALE,
                    isVegan: false,
                    tripId: 1,
                }
            }
            return null
        }),

        deleteParticipant: jest.fn((id: number) => {
            return id
        }),

        allParticipants: jest.fn(() => {
            return [{
                    imie: "example",
                    nazwisko: "example",
                    gender: Gender.MALE,
                    isVegan: false,
                    tripId: 1,
            }]
        })

    }

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ParticipantController],
            providers: [ParticipantsService,{provide: AuthService, useValue: {validateToken: jest.fn()}}],
        })
        .overrideProvider(ParticipantsService)
        .useValue(mockParticipantService)
        .compile();
    
        controller = module.get<ParticipantController>(ParticipantController);
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('should create a participant',async () => {
        const dto: CreateParticipantDto = {
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        }
        const response = await controller.addParticipant(dto)
        expect(response).toEqual({
            id: 1,
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        });

        expect(mockParticipantService.createParticipant).toHaveBeenCalledWith(dto);
    })

    it('should update a participant', async () => {
        const dto = {
            imie: "example2",
            nazwisko: "example2",
            gender: Gender.FEMALE,
            isVegan: true,
            tripId: 2,
        }


        const response = await controller.updateParticipant("1",dto);

        expect(response).toEqual({
            id: 1,
            imie: "example2",
            nazwisko: "example2",
            gender: Gender.FEMALE,
            isVegan: true,
            tripId: 2,
        });

        expect(mockParticipantService.updateParticipant).toHaveBeenCalled();

    })

    it('should delete a participant', async () => {
        const id = "1";

        const response = await controller.deleteParticipant(id);
        expect(response).toEqual(1)

        expect(mockParticipantService.deleteParticipant).toHaveBeenCalled();

    })

    it('should return a array of participants', async () => {
        const response = await controller.getWholeParticipants();
        expect(response).toEqual([{
            imie: "example",
            nazwisko: "example",
            gender: Gender.MALE,
            isVegan: false,
            tripId: 1,
        }])
    })
})