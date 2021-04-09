import { registerDecorator } from "class-validator";

export function decoratorValidate(validationOptions, validator) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator
        });
    };
}

