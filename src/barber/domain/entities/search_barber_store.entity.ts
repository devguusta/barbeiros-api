import {
    IsEmail,
    IsNotEmpty,
    IsString,
   
    IsMobilePhone,
} from 'class-validator';
import { Address } from './address.entity';

export class SearchBarberStore {
    @IsString()
    name: string;


    @IsString()
    document: string;



}
