import {  ValidationPipe } from "@nestjs/common"
import type {INestApplication} from "@nestjs/common";
import type { App } from "supertest/types"
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { AppModule } from "../src/app.module";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import request from 'supertest';
import { COORDINATOR, participants, users } from "./mock-values";
import { Gender } from "../generated/prisma/client";


describe('ParticipantController', () => {
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

    it('/participant/:{id} (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/budzetownik/participant/${participants[0].id.toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: participants[0].id,
            })
        )
    })

    it('/participants (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/budzetownik/participants')
            .expect(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: participants[0].id,
                    imie: participants[0].imie,
                    nazwisko: participants[0].nazwisko,
                    isVegan: participants[0].isVegan,
                    gender: participants[0].gender,
                    tripId: participants[0].tripId,
                }),
                expect.objectContaining({
                    id: participants[1].id,
                    imie: participants[1].imie,
                    nazwisko: participants[1].nazwisko,
                    isVegan: participants[1].isVegan,
                    gender: participants[1].gender,
                    tripId: participants[1].tripId,
                })
            ])
        )
    })

    it('/participant/:{id} (DELETE)',async () => {
        const response = await request(app.getHttpServer())
            .delete(`/budzetownik/deleteParticipant/${participants[0].id.toString()}`)
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: participants[0].id,
            })
        )
    })

    it('/addParticipant (POST)', async () => {
        return request(app.getHttpServer())
            .post("/budzetownik/addParticipant")
            .send({
                imie: "Stanisław",
                nazwisko: "Banasiak",
                isVegan: false,
                gender: Gender.MALE,
                tripId: 1,
            })
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(201)
            .then((participant) => {
                expect(participant.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number) as number,
                    imie: "Stanisław",
                    nazwisko: "Banasiak",
                    isVegan: false,
                    gender: Gender.MALE,
                    tripId: 1,
                }))
            })
    })

    it('/updateParticipant/:{id} (PATCH)', async () => {
        return request(app.getHttpServer())
            .patch(`/budzetownik/updateParticipant/${participants[0].id.toString()}`)
            .send({
                imie: "Stanisław",
                nazwisko: "Banasiak",
                isVegan: false,
                gender: Gender.MALE,
                tripId: 1,
            })
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(200)
            .then((participant) => {
                expect(participant.body).toEqual(
                expect.objectContaining({
                    id: participants[0].id,
                    imie: "Stanisław",
                    nazwisko: "Banasiak",
                    isVegan: false,
                    gender: Gender.MALE,
                    tripId: 1,
                }))
            })
    })
})