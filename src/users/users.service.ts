import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserSignupDTO } from './dtos/user_signup_dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async signup(dto: UserSignupDTO) {
    try {
      const oldUser = await this.userRepository.findOne({
        where: {
          email: dto.email,
        },
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
      });
      delete user.password;

      return user;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
