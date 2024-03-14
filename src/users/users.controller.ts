import { Body, Controller, Post } from '@nestjs/common';
import { UserSignup } from './domain/entities/user_signup.entity';
import { UsersService } from './domain/services/users.service';

@Controller('auth')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post('signup')
  signup(@Body() dto: UserSignup) {
    return this.authService.signup(dto);
  }
}
