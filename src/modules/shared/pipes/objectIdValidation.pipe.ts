import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, Logger } from '@nestjs/common';
import { isMongoId } from "class-validator";

/**  
    @Pipe ObjectIdValid
    Validate that value is a Mongo ObjectId valid
*/

@Injectable()
export class ObjectIdValid implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (typeof value !== 'string') {
            throw new BadRequestException('', `"${value}" no es un ObjectId válido`)
        }

        const valid = isMongoId(value)

        if (!valid) {
            throw new BadRequestException('', `"${value}" no es un ObjectId válido`)
        }

        return value;
    }
}


@Injectable()
export class ManyObjectIdsValid implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!Array.isArray(value)) {
            throw new BadRequestException()
        }

        for (const id of value) {
            if (typeof id !== 'string') {
                throw new BadRequestException('', `"${id}" no es un ObjectId válido`)
            }

            const valid = isMongoId(id)

            if (!valid) {
                throw new BadRequestException('', `"${id}" no es un ObjectId válido`)
            }
        }

        return value;
    }
}
