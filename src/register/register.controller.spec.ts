import { Test, TestingModule } from "@nestjs/testing";

import { RegisterController } from "./register.controller";
import { RegisterService } from "./register.service";

describe("RegisterController", () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
