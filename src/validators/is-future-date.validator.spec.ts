import { IsFutureDateConstraint } from "./is-future-date.validator";

describe("IsFutureDateConstraint", () => {
  let constraint: IsFutureDateConstraint;

  beforeEach(() => {
    constraint = new IsFutureDateConstraint();
  });

  describe("validate", () => {
    it("should return true for today's date", () => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      const result = constraint.validate(todayString, {});

      expect(result).toBe(true);
    });

    it("should return true for a future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7); // 7 days from now
      const futureDateString = futureDate.toISOString().split("T")[0];

      const result = constraint.validate(futureDateString, {});

      expect(result).toBe(true);
    });

    it("should return true for a date far in the future", () => {
      const futureDate = "2030-12-31";

      const result = constraint.validate(futureDate, {});

      expect(result).toBe(true);
    });

    it("should return false for a past date", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // Yesterday
      const pastDateString = pastDate.toISOString().split("T")[0];

      const result = constraint.validate(pastDateString, {});

      expect(result).toBe(false);
    });

    it("should return false for a date far in the past", () => {
      const pastDate = "2020-01-01";

      const result = constraint.validate(pastDate, {});

      expect(result).toBe(false);
    });

    it("should return false when value is not a string", () => {
      const result = constraint.validate(123, {});

      expect(result).toBe(false);
    });

    it("should return false when value is null", () => {
      const result = constraint.validate(null, {});

      expect(result).toBe(false);
    });

    it("should return false when value is undefined", () => {
      const result = constraint.validate(undefined, {});

      expect(result).toBe(false);
    });

    it("should return false when value is an empty string", () => {
      const result = constraint.validate("", {});

      expect(result).toBe(false);
    });

    it("should return false for an invalid date string", () => {
      const result = constraint.validate("invalid-date", {});

      expect(result).toBe(false);
    });

    it("should return false for a malformed date string", () => {
      const result = constraint.validate("2025-13-32", {}); // Invalid month and day

      expect(result).toBe(false);
    });

    it("should handle ISO date strings with time", () => {
      const futureDateTime = new Date();
      futureDateTime.setDate(futureDateTime.getDate() + 1);
      const futureDateTimeString = futureDateTime.toISOString();

      const result = constraint.validate(futureDateTimeString, {});

      expect(result).toBe(true);
    });

    it("should handle different date formats", () => {
      // Note: This might fail depending on the Date constructor's parsing
      // The Date constructor is quite flexible but behavior can vary
      const futureDate = "12/31/2030"; // MM/DD/YYYY format

      const result = constraint.validate(futureDate, {});

      expect(result).toBe(true);
    });

    it("should correctly handle edge case around midnight", () => {
      // Test with a time component that might affect the date comparison
      const today = new Date();
      const todayWithTime = `${today.toISOString().split("T")[0]}T23:59:59`;

      const result = constraint.validate(todayWithTime, {});

      expect(result).toBe(true);
    });

    it("should return false for yesterday with time component", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayWithTime = `${yesterday.toISOString().split("T")[0]}T23:59:59`;

      const result = constraint.validate(yesterdayWithTime, {});

      expect(result).toBe(false);
    });

    it("should handle leap year dates correctly", () => {
      const leapYearDate = "2024-02-29"; // 2024 is a leap year

      // Since this is in the past (if running in 2025), it should return false
      const result = constraint.validate(leapYearDate, {});

      expect(result).toBe(false);
    });

    it("should handle year boundaries correctly", () => {
      const newYearFuture = "2026-01-01";

      const result = constraint.validate(newYearFuture, {});

      expect(result).toBe(true);
    });
  });

  describe("defaultMessage", () => {
    it("should return correct default message", () => {
      const message = constraint.defaultMessage({});

      expect(message).toBe("Date must be today or in the future");
    });

    it("should return the same message regardless of validation arguments", () => {
      const message1 = constraint.defaultMessage({});
      const message2 = constraint.defaultMessage({ property: "startDate" });

      expect(message1).toBe(message2);
      expect(message1).toBe("Date must be today or in the future");
    });
  });
});
