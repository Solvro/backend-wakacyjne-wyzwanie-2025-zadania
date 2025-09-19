import type { ValidationArguments } from "class-validator";

import { IsFutureDateConstraint } from "./is-future-date.validator";

describe("IsFutureDateConstraint", () => {
  let validator: IsFutureDateConstraint;
  const mockValidationArguments: ValidationArguments = {
    value: "",
    constraints: [],
    targetName: "TestClass",
    object: {},
    property: "testProperty",
  };

  beforeEach(() => {
    validator = new IsFutureDateConstraint();
  });

  it("should be defined", () => {
    expect(validator).toBeDefined();
  });

  describe("validate", () => {
    it("should return false for null value", () => {
      const result = validator.validate(null, mockValidationArguments);
      expect(result).toBe(false);
    });

    it("should return false for undefined value", () => {
      const result = validator.validate(undefined, mockValidationArguments);
      expect(result).toBe(false);
    });

    it("should return true for today's date", () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const result = validator.validate(
        today.toISOString(),
        mockValidationArguments,
      );
      expect(result).toBe(true);
    });

    it("should return true for future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const result = validator.validate(
        futureDate.toISOString(),
        mockValidationArguments,
      );
      expect(result).toBe(true);
    });

    it("should return false for past date", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const result = validator.validate(
        pastDate.toISOString(),
        mockValidationArguments,
      );
      expect(result).toBe(false);
    });
  });

  describe("defaultMessage", () => {
    it("should return correct error message", () => {
      const message = validator.defaultMessage(mockValidationArguments);
      expect(message).toBe("Date must be today or in the future");
    });
  });
});
