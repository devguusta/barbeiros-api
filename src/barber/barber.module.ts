import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';
import { AddressModel } from 'src/core/model/address.model';
import { BarberStoreModel } from './infra/model/barber_store.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from 'src/core/auth/strategy';
import { UsersModel } from 'src/users/infra/models/user.model';
import { ValidatorService } from '../core/validators/validators_service';
dotenv.config();

@Module({
  imports: [
  
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    TypeOrmModule.forFeature([AddressModel, BarberStoreModel, UsersModel]),
  ],
  controllers: [BarberController],
  providers: [BarberService, JwtStrategy, ValidatorService]
})
export class BarberModule {}
