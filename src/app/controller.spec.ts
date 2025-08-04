import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AppController } from './controller';
import { AppService } from './service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return proper quote', () => {
      expect(appController.getBackend()).toStrictEqual({"quote": "Śruba się kręci.", "title": "Wakacyjne Wyzwanie Solvro!!!"});
    });
  });
});
