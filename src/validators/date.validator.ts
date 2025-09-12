import { ValidatorConstraint } from "class-validator";

@ValidatorConstraint({ name: "isDateCorrect", async: false })
export class DateValidator {
  validate(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date.getTime() > now.getTime();
  }
  defaultMessage(): string {
    return "Date expected to be in the future";
  }
}
