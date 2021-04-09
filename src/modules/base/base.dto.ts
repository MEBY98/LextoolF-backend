import { BadRequestException, Logger } from '@nestjs/common';
import { Allow, validate } from "class-validator";
import { IsValidMongoId } from "../shared/validators/IsValidMongoId";
import { MongoBaseModel } from "./typegoose/base.model";

// Default scenarios 
export const SCENARIO_CREATE: string = 'create'
export const SCENARIO_UPDATE: string = 'update'


/**
 *   Contains scenario on create object
 **/
export const ON_CREATE = {
    groups: [SCENARIO_CREATE]
};

/**
 *   Contains scenario on update object
 **/
export const ON_UPDATE = {
    groups: [SCENARIO_UPDATE]
};

/**
 *   Indicates if validation must be performed always, no matter of validation groups used.
 **/
export const ALWAYS = {
    always: true
}

/**
 *   Specifies if validated value is an array and each of its item must be validated.
 **/
export const EACH = {
    each: true
}


/**
 * Base Dto for validation based in scenarios. Children extend this class need to have the following definition:
 * @example:
 * 
 * export class PostDto extends BaseDto<Post> {
 *      ...properties definition and validations rules
 *    }
 **/

/************** IMPORTANT ***************
 IMPORTANT: validation is asynchroniusly,  push 'await' in front of  call to anyone of this methods IMPORTANT TODO: 
*/

export interface IBaseDto {
    validate(withException: boolean, skipMissingProperties, whitelist: boolean, forbidNonWhitelisted: boolean): Promise<object | null>
    validateWithException(scenarios?: string | string[]): Promise<object | null>
    validateSpecific(): Promise<object | null>
    validateCreate(withException?: Boolean, scenarios?: string | string[]): Promise<object | null>
    validateUpdate(withException?: Boolean, scenarios?: string | string[]): Promise<object | null>
    validateCreateWithException(scenarios?: string | string[]): Promise<object | null>
    validateUpdateWithException(scenarios?: string | string[]): Promise<object | null>
    _id: string
}

export class BaseDto<T extends MongoBaseModel> implements IBaseDto {
    constructor(
        data: Partial<T>,
        __scenarios: string | string[] = [],
    ) {
        Object.assign(this, data)
        this.__scenarios = Array.isArray(__scenarios) ? __scenarios : [__scenarios]
    }

    /**
     *   Specifies the scenario @type String, or scenarios @type String[] that will be used in validation.
     *   @default scenario_create for creation of entities
     **/

    /**
    *   Scenarios property should be allowed always, because it's a non-whitelisted property
    **/
    @Allow(ALWAYS)
    __scenarios: string[]

    @IsValidMongoId(ON_UPDATE)
    _id

    /** 
     @param withException If set to true, throw an exception in case of error in validation process
     @param skipMissingProperties If set to true then validator will skip validation of all properties that are null or undefined in the validating object.
     @param whitelist If set to true, validator will strip validated object of any properties that do not have any decorators
     @param forbidNonWhitelisted If set to true, instead of stripping non-whitelisted properties validator will throw an error
     
     Validate instance object based on validations rules defined in Dto.
     IMPORTANT: Use 'validate' method only if you want to customize validation. In other case use
       one of the other methods defined like validateCreate, validateUpdate or validateWithException
    */

    async validate(
        withException: boolean = false,
        skipMissingProperties = false,
        whitelist: boolean = true,
        forbidNonWhitelisted: boolean = true,
    ): Promise<object | null> {
        Logger.debug(this.__scenarios, 'scenarios')

        /** 
        *   IMPORTANT
        *   Notice that key 'this' make reference to children object (when it extends this class), that contains all properties 
        *   definition and rules
        **/
        const errors = await validate(this, {
            whitelist,
            forbidNonWhitelisted,
            skipMissingProperties,
            validationError: {
                target: false
            },
            groups: this.__scenarios
        })

        if (errors.length > 0) {
            Logger.debug(errors, 'validation errors')
            const errorObject = this.getErrors(errors)
            // If withException is true, throw an exception with errors mapped
            if (withException) {
                throw new BadRequestException(errorObject)
            }
            // Return errors mapped 
            return errorObject
        }
        // If no error return null
        return null
    }

    /**
     *  Validate and skip validation of all properties that are null or undefined in the validated object
     **/
    async validateSpecific(): Promise<object | null> {
        const errors = await validate(this, {
            skipMissingProperties: true,
            forbidNonWhitelisted: true,
            whitelist: true,
            validationError: {
                target: false
            },
        })

        if (errors.length > 0) {
            return this.getErrors(errors)
        }
        return null
    }

    /**
     *  Validate and throw an exception if errors validation occurs. 
     **/
    async validateWithException(scenarios?: string | string[]): Promise<object | null> {
        if (scenarios) {
            this.__scenarios = Array.isArray(scenarios) ? scenarios : [scenarios]
        }
        return this.validate(true)
    }

    /**
     *  Validate with scenario create
     **/
    async validateCreate(withException: boolean = false): Promise<object | null> {
        this.__scenarios.push(SCENARIO_CREATE)
        return await this.validate(withException)
    }

    /**
     *  Validate with scenario update
     **/
    validateUpdate(withException: boolean = false): Promise<object | null> {
        this.__scenarios.push(SCENARIO_UPDATE)
        return this.validate(withException, true)
    }

    /**
     *  Validate with scenario create and throw an exception if errors validation occurs
     **/
    async validateCreateWithException(scenarios?: string | string[]): Promise<object | null> {
        if (scenarios) {
            this.includeScenarios(scenarios)
        }
        const result = await this.validateCreate(true)
        return result
    }

    /**
     *  Validate including 'SCENARIO_UPDATE' and throw an exception if errors validation occurs
     **/
    async validateUpdateWithException(scenarios?: string | string[]): Promise<object | null> {
        if (scenarios) {
            this.includeScenarios(scenarios)
        }
        return this.validateUpdate(true)
    }

    private includeScenarios(scenarios: string | string[]) {
        if (Array.isArray(scenarios)) {
            this.__scenarios.concat(...scenarios)
        } else {
            this.__scenarios.push(scenarios)
        }
    }




    /* 
        Private methods for return errors beautify.
    */
    private getErrors(errorsArray) {
        return { validationErrors: this.getErrorObject(errorsArray) }
    }

    private getErrorObject(errors) {
        let array = {}
        for (const e of errors) {
            const x = this.getSimpleErr(e)
            if (Array.isArray(x)) {
                array[e.property] = x
            }
            else {
                // TODO:
                array[e.property] = x
            }
        }
        return array
    }

    private getSimpleErr(e) {
        if (e.constraints) {
            return Object.values(e.constraints)
        } else if (e.children) {
            return this.getErrorObject(e.children)
        }
    }
}
