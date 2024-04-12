import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './services/barber.service';
import { AddressModel } from '../core/model/address.model';
import { BarberStoreModel } from './infra/model/barber_store.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../core/auth/strategy';
import { UsersModel } from '../users/infra/models/user.model';
import { ValidatorHelper } from '../core/validators/validator_helper';
import { ScheduleBarberModel } from './infra/model/schedule_barber.model';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    TypeOrmModule.forFeature([
      AddressModel,
      BarberStoreModel,
      UsersModel,
      ScheduleBarberModel,
    ]),
  ],
  controllers: [BarberController],
  providers: [BarberService, JwtStrategy, ValidatorHelper],
})
export class BarberModule {}
