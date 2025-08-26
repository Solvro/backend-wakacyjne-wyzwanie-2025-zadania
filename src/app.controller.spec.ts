import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseService } from "./database.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DatabaseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return proper quote", () => {
      expect(appController.getBackend()).toStrictEqual({
        quote: "Śruba się kręci.",
        title: "Wakacyjne Wyzwanie Solvro!!!",
      });
    });
  });
});
