import { validate } from "class-validator";

import { IsNotPastDate } from "./past-date.validator";

class TestDto {
  @IsNotPastDate()
  date: Date | string | number;
}

describe("IsNotPastDate", () => {
  let testDto: TestDto;

  beforeEach(() => {
    testDto = new TestDto();
  });

  it("should be defined", () => {
    expect(IsNotPastDate).toBeDefined();
  });

  describe("validation", () => {
    it("should pass validation for future date (Date object)", async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      testDto.date = futureDate;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should pass validation for today's date (Date object)", async () => {
      const today = new Date();
      today.setHours(12, 0, 0, 0); // Set to noon to ensure it's today
      testDto.date = today;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should fail validation for past date (Date object)", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      testDto.date = pastDate;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });

    it("should pass validation for future date (string)", async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      testDto.date = futureDate.toISOString();

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should fail validation for past date (string)", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      testDto.date = pastDate.toISOString();

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });

    it("should pass validation for future date (timestamp)", async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      testDto.date = futureDate.getTime();

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should fail validation for past date (timestamp)", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      testDto.date = pastDate.getTime();

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });

    it("should pass validation for null value", async () => {
      testDto.date = null as any;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should pass validation for undefined value", async () => {
      testDto.date = undefined as any;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should pass validation for empty string", async () => {
      testDto.date = "";

      const errors = await validate(testDto);
      expect(errors).toHaveLength(0);
    });

    it("should fail validation for invalid date string", async () => {
      testDto.date = "invalid-date";

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });

    it("should fail validation for invalid type (object)", async () => {
      testDto.date = {} as any;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });

    it("should fail validation for invalid type (boolean)", async () => {
      testDto.date = true as any;

      const errors = await validate(testDto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isNotPastDate).toBe(
        "date cannot be in the past",
      );
    });
  });
});
