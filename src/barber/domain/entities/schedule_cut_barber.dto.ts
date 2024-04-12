import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ScheduleCutBarberDto {
  @IsString()
  @IsNotEmpty()
  barber_id: string;

  client_id: string;
  @IsNotEmpty()
  @IsDateString()
  schedule_date: Date;
}
