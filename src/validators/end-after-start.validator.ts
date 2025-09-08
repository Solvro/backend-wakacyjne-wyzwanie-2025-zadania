import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "endAfterStart", async: false })
export class EndAfterStartValidator implements ValidatorConstraintInterface {
  validate(endDate: string, arguments_: ValidationArguments) {
    const object = arguments_.object as Record<string, string>;
    const startDate = object.startDate;
    if (!startDate || !endDate) {
      return true;
    }
    const end = new Date(endDate);
    const start = new Date(startDate);
    return end > start;
  }
}
