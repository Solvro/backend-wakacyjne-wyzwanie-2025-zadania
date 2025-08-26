import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseController } from "./database.controller";
import { DatabaseModule } from "./database.module";

describe("DatabaseController", () => {
  let controller: DatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<DatabaseController>(DatabaseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
