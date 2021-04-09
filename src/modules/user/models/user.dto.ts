import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ALWAYS, BaseDto, ON_CREATE, ON_UPDATE } from '../../base/base.dto';
import { User } from './user.model';

export class UserDto extends BaseDto<User> {
    @IsEmail({}, ON_CREATE)
    email: string;

    @MaxLength(80, ALWAYS)
    @IsOptional(ON_UPDATE)
    name: string;

    @IsString(ALWAYS)
    @IsOptional(ALWAYS)
    imgProfile?: string;

    @IsString(ON_CREATE)
    @MinLength(8, ON_CREATE)
    password: string;
}
