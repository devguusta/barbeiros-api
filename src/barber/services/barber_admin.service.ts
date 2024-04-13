import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from '../infra/model/barber_store.model';
import { Repository } from 'typeorm';
import { BarberStore, UpdateWorkTimeDto } from '../domain/entities';
import { ValidatorHelper } from '../../core/validators/validator_helper';
import { ScheduleBarberModel } from '../infra/model/schedule_barber.model';
import { IBarberAdminService } from './ibarber_admin.service';

@Injectable()
export class BarberAdminService implements IBarberAdminService {
  constructor(
    @InjectRepository(BarberStoreModel)
    private repository: Repository<BarberStoreModel>,
    @InjectRepository(ScheduleBarberModel)
    private scheduleRepository: Repository<ScheduleBarberModel>,
    private readonly validatorHelper: ValidatorHelper,
  ) {}
  async getMyStores(owner_id: string): Promise<BarberStore[]> {
    try {
      const barber = await this.repository.find({
        where: {
          owner_id: owner_id,
        },
      });

      return barber;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateWorkTime(
    dto: UpdateWorkTimeDto,
    owner_id: string,
  ): Promise<void> {
    try {
      const barber = await this.repository.findOne({
        where: {
          id: dto.barber_id,
        },
      });
      barber.closing_time = dto.close_hour ?? barber.closing_time;
      barber.opening_time = dto.start_hour ?? barber.opening_time;
      if (!barber) {
        throw new NotFoundException('resource not found');
      }
      if (barber.owner_id !== owner_id) {
        throw new UnauthorizedException('you need to be owner of this barber');
      }
      await this.repository.save(barber);
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
