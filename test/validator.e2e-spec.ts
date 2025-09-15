import type { ValidationArguments } from "class-validator";

import { Password } from "../src/validators/password.validator";

describe("PasswordStrengthValidator", () => {
  let validator: Password;

  const mockValidationArguments: ValidationArguments = {
    value: undefined,
    targetName: "TestClass",
    object: {},
    property: "password",
    constraints: [],
  };

  beforeEach(() => {
    validator = new Password();
  });

  beforeAll(() => {
    validator = new Password();
  });

  it("should return false if it is shorter than 6 characters", () => {
    const result = validator.validate("Aa#2a", mockValidationArguments);
    expect(result).toBe(false);
  });
  it("should return false if no upper case letter", () => {
    const result = validator.validate("aaaaad#2a", mockValidationArguments);
    expect(result).toBe(false);
  });
  it("should return false if there is no special sign", () => {
    const result = validator.validate("Aaas23srs2a", mockValidationArguments);
    expect(result).toBe(false);
  });
  it("should return true if it is more than 6 charatcters long has", () => {
    const result = validator.validate("Aa#2a", mockValidationArguments);
    expect(result).toBe(false);
  });
});
