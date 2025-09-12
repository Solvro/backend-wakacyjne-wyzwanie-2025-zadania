import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import { TripController } from "./trip.controller"
import { TripsService } from "../services/trip.service";
import { AuthService } from "../services/auth.service";
import type { CreateTripDto } from "../Dto/create-trip-dto";



describe('TripController', () => {
    let controller: TripController;

    const mockTripService = {
        createTrip: jest.fn((dto) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return{
                id: 1,
                ...dto
            }
        }),

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        updateTrip: jest.fn((parameters: {id: number, newData}) => ({
            id: parameters.id,
            ...parameters.newData,
        })),

        tripById: jest.fn((id: number) => {
            if(id === 1 ){
                return {
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
                    location: "example",
                }
            }
            return null
        }),

        deleteTrip: jest.fn((id: number) => {
            return id
        }),

        allTrips: jest.fn(() => {
            return [{
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
                    location: "example",
                }]
        })
    }
    
    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TripController],
            providers: [TripsService,{provide: AuthService, useValue: {validateToken: jest.fn()}}],
        })
        .overrideProvider(TripsService)
        .useValue(mockTripService)
        .compile();
    
        controller = module.get<TripController>(TripController);
    })
    
    it('should be defined', () => {
        expect(controller).toBeDefined();
    })


    it('should create a trip',async () => {
        const dto: CreateTripDto = {
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        }
        const response = await controller.addTrip(dto)
        expect(response).toEqual({
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        });

        expect(mockTripService.createTrip).toHaveBeenCalledWith(dto);
    })

    it('should update a trip', async () => {
        const dto = {
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            location: "example2",
        }

        const response = await controller.updateTrip("1",dto);

        expect(response).toEqual({
            id: 1,
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 48).toString(),
            location: "example2",
        });

        expect(mockTripService.updateTrip).toHaveBeenCalled();

    })

    it('should delete a trip', async () => {
        const id = "1";

        const response = await controller.deleteTrip(id);
        expect(response).toEqual(1)

        expect(mockTripService.deleteTrip).toHaveBeenCalled();

    })

    it('should return an array of trips', async () => {
        const response = await controller.getWholeTrips();
        expect(response).toEqual([{
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
            location: "example",
        }])
    })
})