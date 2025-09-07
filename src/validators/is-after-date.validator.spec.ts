import { IsAfterDateConstraint } from "./is-after-date.validator";

describe("IsAfterDateConstraint", () => {
  let constraint: IsAfterDateConstraint;

  beforeEach(() => {
    constraint = new IsAfterDateConstraint();
  });

  describe("validate", () => {
    it("should return true when current date is after the related date", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: "2025-01-15",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-15", validationArguments);

      expect(result).toBe(true);
    });

    it("should return true when current date is significantly after the related date", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: "2025-12-31",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-12-31", validationArguments);

      expect(result).toBe(true);
    });

    it("should return false when current date is before the related date", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-15",
          endDate: "2025-01-01",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-01", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when current date is the same as the related date", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: "2025-01-01",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-01", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when value is not a string", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: 123,
        },
        property: "endDate",
      };

      const result = constraint.validate(123, validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when value is null", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: null,
        },
        property: "endDate",
      };

      const result = constraint.validate(null, validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when value is undefined", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: undefined,
        },
        property: "endDate",
      };

      const result = constraint.validate(undefined, validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when related value is not a string", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: 123,
          endDate: "2025-01-15",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-15", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when related value is null", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: null,
          endDate: "2025-01-15",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-15", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when related value is undefined", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: undefined,
          endDate: "2025-01-15",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-15", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when value is an invalid date string", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "2025-01-01",
          endDate: "invalid-date",
        },
        property: "endDate",
      };

      const result = constraint.validate("invalid-date", validationArguments);

      expect(result).toBe(false);
    });

    it("should return false when related value is an invalid date string", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "invalid-date",
          endDate: "2025-01-15",
        },
        property: "endDate",
      };

      const result = constraint.validate("2025-01-15", validationArguments);

      expect(result).toBe(false);
    });

    it("should handle time components correctly", () => {
      const validationArguments = {
        constraints: ["startDateTime"],
        object: {
          startDateTime: "2025-01-01T10:00:00",
          endDateTime: "2025-01-01T15:00:00",
        },
        property: "endDateTime",
      };

      const result = constraint.validate(
        "2025-01-01T15:00:00",
        validationArguments,
      );

      expect(result).toBe(true);
    });

    it("should return false when times are the same", () => {
      const validationArguments = {
        constraints: ["startDateTime"],
        object: {
          startDateTime: "2025-01-01T10:00:00",
          endDateTime: "2025-01-01T10:00:00",
        },
        property: "endDateTime",
      };

      const result = constraint.validate(
        "2025-01-01T10:00:00",
        validationArguments,
      );

      expect(result).toBe(false);
    });

    it("should work with different date formats", () => {
      const validationArguments = {
        constraints: ["startDate"],
        object: {
          startDate: "01/01/2025",
          endDate: "01/15/2025",
        },
        property: "endDate",
      };

      const result = constraint.validate("01/15/2025", validationArguments);

      expect(result).toBe(true);
    });
  });

  describe("defaultMessage", () => {
    it("should return correct default message", () => {
      const validationArguments = {
        constraints: ["startDate"],
        property: "endDate",
      };

      const message = constraint.defaultMessage(validationArguments);

      expect(message).toBe("endDate must be after startDate");
    });

    it("should handle different property names", () => {
      const validationArguments = {
        constraints: ["beginTime"],
        property: "finishTime",
      };

      const message = constraint.defaultMessage(validationArguments);

      expect(message).toBe("finishTime must be after beginTime");
    });
  });
});
