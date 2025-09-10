import { validate } from "class-validator";

import { IsAfterStartDate } from "./is-after-start-date.validator";

class TestClass {
  start_date?: Date;

  @IsAfterStartDate()
  end_date?: Date;

  constructor(start_date?: Date, end_date?: Date) {
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
describe("IsAfterStartDate validator test", () => {
  it("Powinien zwrócić true jeżeli end_date jest większy niż start_date", async () => {
    const testObject = new TestClass(
      new Date("2024-01-01"),
      new Date("2024-01-02"),
    );
    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });
  it("Powinien zwrócić false jeżeli end_date jest mniejszy niż start_date", async () => {
    const testObject = new TestClass(
      new Date("2024-01-03"),
      new Date("2024-01-02"),
    );
    const errors = await validate(testObject);
    expect(errors).toHaveLength(1);
  });
});
