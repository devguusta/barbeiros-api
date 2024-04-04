import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infra/models/user.model';
import { UserSignup } from '../entities/user_signup.entity';
import * as bcrypt from 'bcrypt';
import { IUserService } from './iuser_service';
import { SignInDTO } from '../../dtos/sigin_dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ValidatorHelper } from '../../../core/validators/validator_helper';
@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
    private readonly validatorHelper: ValidatorHelper,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signIn(dto: SignInDTO): Promise<{ access_token: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Credentials invalid');
      }
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new ForbiddenException('Credentials invalid');
      }

      return this._signToken({
        email: user.email,
        barber: user.barber,
        password: user.password,
        name: user.name,
        id: user.id,
        cellphone: user.cellphone,
        document: user.document,
        createdAt: user.createdAt,
        updateAt: user.updateAt,
        admin: user.admin,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async signup(userSignup: UserSignup): Promise<void> {
    const { email, document } = userSignup;

    if (!this.validatorHelper.validateCPF(document)) {
      throw new BadRequestException({
        message: 'Invalid document',
        statusCode: 400,
      });
    }

    const oldUser = await this.userRepository.findOne({
      where: [{ email }, { document }],
    });
    console.log(oldUser);
    if (oldUser) {
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

    throw error;
  }

  async _signToken(dto: UsersModel): Promise<{ access_token: string }> {
    const payload = {
      sub: dto.id,
      email: dto.email,
      barber: dto.barber,
      name: dto.name,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
