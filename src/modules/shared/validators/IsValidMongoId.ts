import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import mongoose from 'mongoose';
import { decoratorValidate } from "./decoratorValidate";
import { Logger } from '@nestjs/common';


/**
    @Decorator IsValidMongoId
    Validate that value is a valid mongo ID
*/

@ValidatorConstraint({ name: "IsValidMongoId", async: false })
class IsValidMongoIdConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments) {
        return mongoose.Types.ObjectId.isValid(value)
    }
    defaultMessage(args: ValidationArguments) {
        return `El valor ${args.value} no es un id válido de MongoDB`;
    }
}

/**
 * Checks if the string is a valid MongoDB ObjectId.
 */
export function IsValidMongoId(validationOptions?: ValidationOptions) {
    return decoratorValidate(validationOptions, IsValidMongoIdConstraint)
}

export function isValidMongoId(value: any) {
    return mongoose.Types.ObjectId.isValid(value)
}
