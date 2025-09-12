import { ValidationPipe  } from "@nestjs/common"
import type {INestApplication} from "@nestjs/common";
import type { App } from "supertest/types"
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from 'supertest';
import { COORDINATOR, trips, USER, users } from "./mock-values";
import type { CreateTripDto } from "src/Dto/create-trip-dto";

describe('TripController',() => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        await cleanDatabase().then(async () => {
            await seedDatabase();
        });
        
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
        .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    })

    it('/ (GET)', () => {
        expect(app.getHttpServer()).toBeDefined()
    });

    it('/trip/:{id} (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/budzetownik/trip/${trips[0].id.toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: trips[0].id,
                location: trips[0].location,
            })
        )
    })

    it('/trips (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/budzetownik/trips')
            .expect(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: trips[0].id,
                    location: trips[0].location,
                }),
                expect.objectContaining({
                    id: trips[1].id,
                    location: trips[1].location,
                })
            ])
        )
    })

    it('/trip/:{id} (DELETE)',async () => {
        const response = await request(app.getHttpServer())
            .delete(`/budzetownik/deleteTrip/${trips[0].id.toString()}`)
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: trips[0].id,
            })
        )
    })

    it('/addTrip (POST)', async () => {
            return request(app.getHttpServer())
            .post("/budzetownik/addTrip")
            .send({
                location: "Poznań",
                start_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
                end_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            })
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(201)
            .then((trip) => {
                expect(trip.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number) as number,
                    location: "Poznań",
                }))
            })
    })

    //Auth testing 
    it('/addTrip (POST)', async () => {
            return request(app.getHttpServer())
            .post("/budzetownik/addTrip")
            .send({
                location: "Poznań",
                start_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
                end_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
            })
            .set('authorization',`Bearer token_${users[USER].email}_${(Date.now()).toString()}`)
            .expect(403)
    })

    //Validator testing 
    it('/addTrip (POST)', async () => {
        const createTripDto: CreateTripDto = {
            location: "Poznań",
            start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
            end_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        }
        return request(app.getHttpServer())
        .post("/budzetownik/addTrip")
        .send(createTripDto)
        .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
        .expect(400)
    })

    it('/updateTrip/:{id} (PATCH)', async () => {
        const start_date = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();
        const end_date = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();
        return request(app.getHttpServer())
        .patch(`/budzetownik/updateTrip/${trips[0].id.toString()}`)
        .send({
            location: "Warszawa",
            start_date,
            end_date,
        })
        .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
        .expect(200)
        .then((trip) => {
            expect(trip.body).toEqual(
            expect.objectContaining({
                id: trips[0].id,
                location: "Warszawa",
                start_date,
                end_date,
            }))
        })
    })
})