import { Module } from '@nestjs/common';

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
import { BarberAdminService } from './services/barber_admin.service';
import { BarberAdminController, BarberController } from './controllers';
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
  controllers: [BarberController, BarberAdminController],
  providers: [BarberService, JwtStrategy, ValidatorHelper, BarberAdminService],
})
export class BarberModule {}
