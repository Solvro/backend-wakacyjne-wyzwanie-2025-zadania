import { validate } from "class-validator";

import { IsFutureDate } from "./is-future-date.validator";

class Dto {
  @IsFutureDate({ message: "must be future" })
  date: string | null;
}

describe("IsFutureDate validator", () => {
  it("accepts null", async () => {
    const dto = new Dto();
    dto.date = null;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("rejects past date", async () => {
    const dto = new Dto();
    dto.date = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toBeDefined();
  });

  it("accepts future date", async () => {
    const dto = new Dto();
    dto.date = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
