import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infra/models/user.model';
import { UserSignup } from '../entities/user_signup.entity';
import * as bcrypt from 'bcrypt';
import { IUserService } from './iuser_service';
@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}
  async signup(userSignup: UserSignup): Promise<void> {
    const { email, document } = userSignup;

    const oldUser = await this.userRepository.findOne({
      where: [{ email }, { document }],
    });
    console.log(oldUser);
    if (oldUser) {
      console.log('ola');
      throw new BadRequestException({
        message: 'User already exists',
        statusCode: 400,
      });
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userSignup.password, saltOrRounds);
    const user = await this.userRepository.save({
      email: userSignup.email,
      name: userSignup.name,
      password: hash,
      admin: false,
      document: userSignup.document,
      cellphone: userSignup.cellphone,
    });
    delete user.password && delete user.admin && delete user.document;

    return;
  }
  catch(error) {
    console.log(error);

    throw new InternalServerErrorException({
      message: error.message,
    });
  }
}
