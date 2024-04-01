import { Body, Controller, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../core/auth/guard';
import { BarberService } from './barber.service';
import { BarberStore } from './domain/entities';
@UseGuards(JwtGuard)
@Controller('barber')
export class BarberController {
    constructor(private barberService: BarberService) {}


    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: BarberStore,  @Req() req) {
        console.log(req.user);
        const {barber, id, name} = req.user
        if(!barber){
            throw new  UnauthorizedException(
            "User is not a barber"
            )
        }
      return this.barberService.signup(dto, id,name);
    }
  

}
