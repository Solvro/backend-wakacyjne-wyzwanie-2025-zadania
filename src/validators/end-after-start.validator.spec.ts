import type { ValidationArguments } from "class-validator";

import { EndAfterStartValidator } from "./end-after-start.validator";

function createValidationArguments(
  object: Record<string, string>,
): ValidationArguments {
  return {
    value: object.endDate,
    constraints: [],
    targetName: "testObject",
    object,
    property: "endDate",
  };
}

describe("EndAfterStartValidator", () => {
  let validator: EndAfterStartValidator;

  beforeEach(() => {
    validator = new EndAfterStartValidator();
  });

  it("should return true if startDate or endDate is missing", () => {
    const arguments1 = createValidationArguments({});
    expect(validator.validate(undefined as unknown as string, arguments1)).toBe(
      true,
    );

    const arguments2 = createValidationArguments({ startDate: "" });
    expect(validator.validate("2025-09-01", arguments2)).toBe(true);
  });

  it("should return true if endDate is after startDate", () => {
    const arguments_ = createValidationArguments({
      startDate: "2025-09-01",
      endDate: "2025-09-10",
    });
    expect(validator.validate("2025-09-10", arguments_)).toBe(true);
  });

  it("should return false if endDate is equal to startDate", () => {
    const arguments_ = createValidationArguments({
      startDate: "2025-09-01",
      endDate: "2025-09-01",
    });
    expect(validator.validate("2025-09-01", arguments_)).toBe(false);
  });

  it("should return false if endDate is before startDate", () => {
    const arguments_ = createValidationArguments({
      startDate: "2025-09-01",
      endDate: "2025-08-31",
    });
    expect(validator.validate("2025-08-31", arguments_)).toBe(false);
  });
});
