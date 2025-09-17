import { Validate, validateSync } from "class-validator";

import { IsPastDate } from "./past-date.validator";

describe("IsPastDate validator", () => {
  class TestDto {
    @Validate(IsPastDate)
    date: string;
  }

  it("should validate a past date", () => {
    const dto = new TestDto();
    dto.date = new Date(Date.now() - 1000).toISOString();
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it("should invalidate a future date", () => {
    const dto = new TestDto();
    dto.date = new Date(Date.now() + 1_000_000).toISOString();
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty("IsPastDate");
  });

  it("should invalidate an invalid date", () => {
    const dto = new TestDto();
    dto.date = "date";
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty("IsPastDate");
  });
});
