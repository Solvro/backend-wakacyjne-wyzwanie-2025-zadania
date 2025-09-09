import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    if (!date) return false;
    
    const inputDate = new Date(date);
    const now = new Date();
    
    now.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate > now;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a future date`;
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
}
