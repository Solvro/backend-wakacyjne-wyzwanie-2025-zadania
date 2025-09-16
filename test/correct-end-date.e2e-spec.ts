import type { ValidationArguments } from "class-validator";
import type { CreateTripDto } from "src/trip/dto/create-trip.dto";

import { CorrectEndDate } from "../src/validators/correct-end-date.validator";

const createValidationArguments = (
  object: CreateTripDto,
): ValidationArguments => ({
  object,
  value: object.end_date,
  targetName: "CreateTripDto",
  property: "end_date",
  constraints: [],
});

describe("CorrectEndDate validator", () => {
  let validator: CorrectEndDate;

  beforeEach(() => {
    validator = new CorrectEndDate();
  });

  it("should return true when end_date is equal to begin_date", () => {
    const dto: CreateTripDto = {
      name: "Trip",
      description: "test",
      begin_date: new Date("2025-01-01"),
      end_date: new Date("2025-01-01"),
    };

    const result = validator.validate(
      dto.end_date,
      createValidationArguments(dto),
    );
    expect(result).toBe(true);
  });

  it("should return true when end_date is after begin_date", () => {
    const dto: CreateTripDto = {
      name: "Trip",
      description: "test",
      begin_date: new Date("2025-01-01"),
      end_date: new Date("2025-01-02"),
    };

    const result = validator.validate(
      dto.end_date,
      createValidationArguments(dto),
    );
    expect(result).toBe(true);
  });

  it("should return false when end_date is before begin_date", () => {
    const dto: CreateTripDto = {
      name: "Trip",
      description: "test",
      begin_date: new Date("2025-01-02"),
      end_date: new Date("2025-01-01"),
    };

    const result = validator.validate(
      dto.end_date,
      createValidationArguments(dto),
    );
    expect(result).toBe(false);
  });

  it("should return correct default message", () => {
    expect(validator.defaultMessage()).toBe(
      "end_date must be the same or later than begin_date",
    );
  });
});
