import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
    MinLength,
    IsMobilePhone,
  } from 'class-validator';
  
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
    cep: string;
  
    @IsString()
    complement: string;
  
  }
  