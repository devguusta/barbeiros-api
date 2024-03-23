import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';

@Module({
  controllers: [BarberController],
  providers: [BarberService]
})
export class BarberModule {}
