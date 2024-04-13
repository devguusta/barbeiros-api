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
import { JwtGuard } from '../../core/auth/guard';
import { BarberService } from '../services/barber.service';
import {
  BarberStore,
  ScheduleCutBarberDto,
  SearchBarberStore,
  UpdateWorkTimeDto,
} from '../domain/entities';
@UseGuards(JwtGuard)
@Controller('barber')
export class BarberController {
  constructor(private barberService: BarberService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: BarberStore, @Req() req) {
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

  @Post('schedule')
  @HttpCode(HttpStatus.OK)
  scheduleBarber(@Body() dto: ScheduleCutBarberDto, @Req() req) {
    const { id } = req.user;
    const scheduleBarber = {
      barber_id: dto.barber_id,
      schedule_date: dto.schedule_date,
      client_id: id,
    };

    return this.barberService.scheduleBarber(scheduleBarber);
  }
}
