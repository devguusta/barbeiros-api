import { Module } from '@nestjs/common';
import { UsersController } from './domain/controllers/users.controller';
import { UsersService } from './domain/services/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './infra/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ValidatorHelper } from '../core/validators/validator_helper';
@Module({
  imports: [TypeOrmModule.forFeature([UsersModel]), JwtModule.register({})],

  controllers: [UsersController],
  providers: [UsersService, ValidatorHelper],
})
export class UsersModule {}
