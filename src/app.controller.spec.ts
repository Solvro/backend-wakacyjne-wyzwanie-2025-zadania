import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("AppController root endpoint", () => {
    it("appController.getHello()", () => {
      expect(appController.getHello()).toStrictEqual({
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote: "Jestem czajnikiem",
      });
    });
  });
});
