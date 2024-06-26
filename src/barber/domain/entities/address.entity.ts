import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class Address {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  complement: string;
}
