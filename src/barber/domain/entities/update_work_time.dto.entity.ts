import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkTimeDto {
  start_hour?: string;

  close_hour?: string;
  @IsString()
  @IsNotEmpty()
  barber_id: string;
}
