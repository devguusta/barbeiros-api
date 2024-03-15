import { Body, Controller, Post } from '@nestjs/common';
import { UserSignup } from '../entities/user_signup.entity';
import { UsersService } from '../services/users.service';
import { SignInDTO } from '../../dtos/sigin_dto';

@Controller('auth')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post('signup')
  signup(@Body() dto: UserSignup) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto);
  }
}
