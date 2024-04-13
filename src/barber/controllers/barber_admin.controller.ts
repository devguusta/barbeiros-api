import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../core/auth/guard';
import { UpdateWorkTimeDto } from '../domain/entities';
import { BarberAdminService } from '../services/barber_admin.service';
@UseGuards(JwtGuard)
@Controller('barber/admin')
export class BarberAdminController {
  constructor(private barberService: BarberAdminService) {}

  @Put('work_time')
  @HttpCode(HttpStatus.CREATED)
  updateWorkTime(@Query() param: UpdateWorkTimeDto, @Req() req) {
    const { barber } = req.user;
    if (!barber) {
      throw new UnauthorizedException('User is not a barber');
    }
    return this.barberService.updateWorkTime(param, req.user.id);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  get(@Req() req) {
    const { id } = req.user;
    return this.barberService.getMyStores(id);
  }
}
