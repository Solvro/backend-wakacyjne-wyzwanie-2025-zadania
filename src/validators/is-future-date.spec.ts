import { validate } from "class-validator";

import { IsFutureDate } from "./is-future-date.validator";

class TestDto {
  @IsFutureDate()
  startDate!: Date;
}

describe("IsFutureDate validator", () => {
  it("powinien przejść dla daty w przyszłości", async () => {
    const dto = new TestDto();
    dto.startDate = new Date(Date.now() + 1000 * 60 * 60); // +1h

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("powinien zwrócić błąd dla daty w przeszłości", async () => {
    const dto = new TestDto();
    dto.startDate = new Date(Date.now() - 1000 * 60 * 60); // -1h

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty("isFutureDate");
  });
});
