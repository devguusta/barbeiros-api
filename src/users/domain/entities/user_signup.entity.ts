import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  IsMobilePhone,
} from 'class-validator';

export class UserSignup {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  cellphone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  @MinLength(11)
  document: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}
