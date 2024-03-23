import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
    MinLength,
    IsMobilePhone,
} from 'class-validator';
import { Address } from './address.entity';

export class BarberStore {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    cellphone: string;

    address: Address

}
