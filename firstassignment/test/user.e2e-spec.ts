import { ValidationPipe, type INestApplication } from "@nestjs/common"
import type { App } from "supertest/types"
import { cleanDatabase } from "./clean-database";
import { seedDatabase } from "./seed-database";
import { Test  } from "@nestjs/testing";
import type {TestingModule} from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from 'supertest';
import { Role } from "../generated/prisma";
import { users, USER } from "./mock-values";

describe('UserController',() => {
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

    //Jeżeli testujemy same sprawdzanie usera, to trzeba zasymulować, że user jest już zalogowany
    it('/user/:{id} (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/budzetownik/user/${users[USER].id.toString()}`)
            .set('authorization',`Bearer token_${users[USER].email}_${(Date.now()).toString()}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                username: "Bob",
                email: "bob@example.com",
                role: Role.USER,
            })
        )
    })
})