import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './infra/models/user.model';
import { UserSignup } from './domain/entities/user_signup.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  async signup(dto: UserSignup) {
    try {
      const { email, document } = dto;

      // const oldUser = await this.userRepository
      //   .createQueryBuilder('user')
      //   .where('user.email = :email OR user.document = :document', {
      //     email,
      //     document,
      //   })
      //   .getOne();
      const oldUser = await this.userRepository.findOne({
        where: [{ email }, { document }],
      });
      console.log(oldUser);
      if (oldUser) {
        console.log('ola');
        return new BadRequestException({
          message: 'User already exists',
          statusCode: 400,
        });
      }

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(dto.password, saltOrRounds);
      const user = await this.userRepository.save({
        email: dto.email,
        name: dto.name,
        password: hash,
        admin: false,
        document: dto.document,
        cellphone: dto.cellphone,
      });
      delete user.password && delete user.admin && delete user.document;

      return user;
    } catch (error) {
      console.log(error);

      return new InternalServerErrorException({
        message: error.message,
      });
    }
  }
}
