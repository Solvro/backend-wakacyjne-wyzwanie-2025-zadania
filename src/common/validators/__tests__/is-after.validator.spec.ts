import { validate } from "class-validator";
import "reflect-metadata";

import { IsAfter } from "../is-after-validator";

class DummyDto {
  startDate = "2025-01-01T10:00:00Z";

  @IsAfter("startDate", {
    allowEqual: true,
    message: "endDate must be on/after startDate",
  })
  endDate = "2025-01-02T10:00:00Z";
}

describe("IsAfter validator", () => {
  it("OK gdy endDate > startDate", async () => {
    const dto = new DummyDto();
    dto.startDate = "2025-01-01T10:00:00Z";
    dto.endDate = "2025-01-01T10:00:01Z";
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("OK gdy endDate == startDate przy allowEqual", async () => {
    const dto = new DummyDto();
    dto.startDate = "2025-01-01T10:00:00Z";
    dto.endDate = "2025-01-01T10:00:00Z";
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("FAIL gdy endDate < startDate", async () => {
    const dto = new DummyDto();
    dto.startDate = "2025-01-01T10:00:00Z";
    dto.endDate = "2025-01-01T09:59:59Z";
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toBeDefined();
  });

  it("FAIL gdy nieprawidłowe formaty dat", async () => {
    const dto = new DummyDto();
    dto.startDate = "lol";
    dto.endDate = "kek";
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
