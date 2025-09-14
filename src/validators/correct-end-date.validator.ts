import { ValidatorConstraint } from "class-validator";
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import { CreateTripDto } from "src/trip/dto/create-trip.dto";

@ValidatorConstraint({ name: "correctEndDate", async: false })
export class CorrectEndDate implements ValidatorConstraintInterface {
  validate(endDate: Date, arguments_: ValidationArguments) {
    const object = arguments_.object as CreateTripDto;
    const beginDate: Date = object.begin_date;

    return new Date(endDate) >= new Date(beginDate);
  }
  defaultMessage() {
    return "end_date must be the same or later than begin_date";
  }
}
