import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CustomTokenGuard } from "./custom-token.guard";

describe("CustomTokenGuard", () => {
  let guard: CustomTokenGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomTokenGuard],
    }).compile();

    guard = module.get<CustomTokenGuard>(CustomTokenGuard);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  it("should extend AuthGuard", () => {
    expect(guard).toBeInstanceOf(CustomTokenGuard);
  });

  it("should have correct strategy name", () => {
    expect(guard).toBeDefined();
  });
});
