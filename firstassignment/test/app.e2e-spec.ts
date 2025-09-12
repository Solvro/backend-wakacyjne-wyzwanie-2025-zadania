import { Test  } from '@nestjs/testing';
import type {TestingModule} from '@nestjs/testing';
import { ValidationPipe  } from '@nestjs/common';
import type {INestApplication} from '@nestjs/common';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    expect(app.getHttpServer()).toBeDefined()
  });
});
