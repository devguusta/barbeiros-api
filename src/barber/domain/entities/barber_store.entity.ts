import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';
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
  @IsMobilePhone()
  cellphone: string;

  address: Address;
}
