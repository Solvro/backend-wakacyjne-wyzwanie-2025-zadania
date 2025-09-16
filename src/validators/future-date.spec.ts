import { validate } from "class-validator";

import { IsFutureDate } from "./future-date.validator";

class TestDto {
  @IsFutureDate()
  date!: string;
}

describe("IsFutureDate validator", () => {
  it("should pass if date is today", async () => {
    const dto = new TestDto();
    dto.date = new Date().toISOString().split("T")[0];

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should pass if date is in the future", async () => {
    const dto = new TestDto();
    const future = new Date();
    future.setDate(future.getDate() + 5);
    dto.date = future.toISOString().split("T")[0];

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail if date is in the past", async () => {
    const dto = new TestDto();
    const past = new Date();
    past.setDate(past.getDate() - 5);
    dto.date = past.toISOString().split("T")[0];

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty("IsFutureDateConstraint");
    expect(errors[0].constraints?.IsFutureDateConstraint).toBe(
      "Date must be today or in the future",
    );
  });

  it("should fail if value is not a valid date string", async () => {
    const dto = new TestDto();
    dto.date = "not-a-date";

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail if value is not a string", async () => {
    const dto = new TestDto();
    (dto as unknown as Record<string, unknown>).date = 12_345;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
