import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

describe("AppModule (bootstrap)", () => {
  it("should compile the module and create the app instance without errors", async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    expect(app).toBeDefined();
    await app.close();
  });
});
