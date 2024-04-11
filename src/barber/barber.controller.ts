import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../core/auth/guard';
import { BarberService } from './services/barber.service';
import {
  BarberStore,
  SearchBarberStore,
  UpdateWorkTimeDto,
} from './domain/entities';
@UseGuards(JwtGuard)
@Controller('barber')
export class BarberController {
  constructor(private barberService: BarberService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: BarberStore, @Req() req) {
    console.log(req.user);
    const { barber, id, name } = req.user;
    if (!barber) {
      throw new UnauthorizedException('User is not a barber');
    }
    return this.barberService.signup(dto, id, name);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  get(@Query() param?: SearchBarberStore) {
    return this.barberService.searchBarber(param);
  }

  @Put('work_time')
  @HttpCode(HttpStatus.CREATED)
  updateWorkTime(@Query() param: UpdateWorkTimeDto, @Req() req) {
    console.log(req.user);
    const { barber } = req.user;
    if (!barber) {
      throw new UnauthorizedException('User is not a barber');
    }
    return this.barberService.updateWorkTime(param, req.user.id);
  }
}
