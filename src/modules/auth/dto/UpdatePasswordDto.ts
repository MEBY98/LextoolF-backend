import { Field, InputType } from '@nestjs/graphql'
import { IsString, MinLength, IsNotEmpty, MaxLength, IsEmail } from 'class-validator'

@InputType()
export class UpdatePasswordDto {
    @Field()
    @IsString()
    @MinLength(8)
    oldPassword: string

    @Field()
    @IsString()
    @MinLength(8)
    newPassword: string
}

@InputType()
export class VerifyTokenPasswordDto {
    @Field()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    passwordToken: string

    @Field()
    @IsEmail()
    email: string
}

@InputType()
export class ResetPasswordDto extends VerifyTokenPasswordDto {
    @Field()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    newPassword: string
}
