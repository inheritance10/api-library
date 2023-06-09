import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter correct email'})
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {message : 'Password must be min 6 character'})
  readonly password : string
}