import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScheduleBarberDto {
  start_hour?: string;

  close_hour?: string;
  @IsString()
  @IsNotEmpty()
  barber_id: string;
}
