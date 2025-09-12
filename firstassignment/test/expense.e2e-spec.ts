import {  ValidationPipe } from "@nestjs/common"
import type {INestApplication} from "@nestjs/common";
import type { App } from "supertest/types"
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { AppModule } from "../src/app.module";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import request from 'supertest';
import { COORDINATOR, expenses, users } from "./mock-values";


describe('ExpenseController', () => {
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

    it('/expense/:{id} (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/budzetownik/expenseById/${expenses[0].id.toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expenses[0].id,
                amount: expenses[0].amount,
                location: expenses[0].location,
                participantId: expenses[0].participantId,
            })
        )
    })

    it('/expenses (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/budzetownik/allExpenses')
            .expect(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expenses[0].id,
                    amount: expenses[0].amount,
                    location: expenses[0].location,
                    participantId: expenses[0].participantId,
                }),
                expect.objectContaining({
                    id: expenses[1].id,
                    amount: expenses[1].amount,
                    location: expenses[1].location,
                    participantId: expenses[1].participantId,
                })
            ])
        )
    })

    it('/expense/:{id} (DELETE)',async () => {
        const response = await request(app.getHttpServer())
            .delete(`/budzetownik/deleteExpense/${expenses[0].id.toString()}`)
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expenses[0].id,
            })
        )
    })

    it('/addExpense (POST)', async () => {
        return request(app.getHttpServer())
            .post("/budzetownik/addExpense")
            .send({
                amount: 78.11,
                location: "Lidl",
                participantId: 1,
            })
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(201)
            .then((expense) => {
                expect(expense.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number) as number,
                    amount: 78.11,
                    location: "Lidl",
                    participantId: 1,
                }))
            })
    })

    it('/updateExpense/:{id} (PATCH)', async () => {
        return request(app.getHttpServer())
            .patch(`/budzetownik/updateExpense/${expenses[0].id.toString()}`)
            .send({
                amount: 78.11,
                location: "Lidl",
                participantId: 1,
            })
            .set('authorization',`Bearer token_${users[COORDINATOR].email}_${(Date.now()).toString()}`)
            .expect(200)
            .then((expense) => {
                expect(expense.body).toEqual(
                expect.objectContaining({
                    id: expenses[0].id,
                    amount: 78.11,
                    location: "Lidl",
                    participantId: 1,
                }))
            })
    })
})