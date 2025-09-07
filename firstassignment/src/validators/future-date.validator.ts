// eslint-disable-next-line import/named
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({name: 'futureDate', async: false})
export class FutureDate implements ValidatorConstraintInterface{
    validate(date: string, _: ValidationArguments){
        return Date.parse(date) - Date.now() > 0;
    }

    defaultMessage(_: ValidationArguments) {
        return "Data musi być przyszła";
    }
}