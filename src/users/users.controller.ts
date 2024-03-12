import { Body, Controller, Post } from '@nestjs/common';
import { UserSignupDTO } from './dtos/user_signup_dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post('signup')
  signup(@Body() dto: UserSignupDTO) {
    return this.authService.signup(dto);
  }
}
