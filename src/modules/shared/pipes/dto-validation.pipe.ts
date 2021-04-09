import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/* 
    Dto validation pipe global, for validate network objects
*/

@Injectable()
export class DtoValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object)

    if (errors.length > 0) {
      throw new BadRequestException('', `Validación fallida: ${errors.map(e => Object.values(e.constraints))}`)
    }

    return value;
  }

  private toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype)
  }
}
