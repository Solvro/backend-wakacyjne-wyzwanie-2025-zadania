import { ValidatorConstraint, registerDecorator } from "class-validator";
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsAfterStartDate", async: false })
export class IsAfterStartDateConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: Date, arguments_: ValidationArguments): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
    if (!endDate) {
      return true;
    } // Jeśli end_date jest opcjonalne i puste

    const startDate = (arguments_.object as { start_date?: unknown })
      .start_date;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!startDate) {
      return true;
    } // Jeśli start_date nie jest podane

    // Zamieniamy na Date i porównujemy
    const start = new Date(startDate as string | number | Date);
    const end = new Date(endDate as string | number | Date);

    // Jeśli jedna z dat jest niepoprawna → nie walidujemy
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return false;
    }

    return end > start;
  }

  defaultMessage(_arguments_: ValidationArguments): string {
    return "Data zakończenia musi być późniejsza niż data rozpoczęcia";
  }
}

// Dekorator do wygodnego użycia w DTO
export function IsAfterStartDate(validationOptions?: ValidationOptions) {
  return function (object_: object, propertyName: string) {
    registerDecorator({
      name: "IsAfterStartDate",
      target: object_.constructor,
      propertyName,
      options: validationOptions,
      validator: IsAfterStartDateConstraint,
    });
  };
}
