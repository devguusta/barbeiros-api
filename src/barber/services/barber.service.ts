import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from '../infra/model/barber_store.model';
import { DataSource, ILike, Repository } from 'typeorm';
import {
  BarberStore,
  ScheduleCutBarberDto,
  SearchBarberStore,
} from '../domain/entities';
import { ValidatorHelper } from '../../core/validators/validator_helper';
import { IBarberService } from './ibarber.service';
import { ScheduleBarberModel } from '../infra/model/schedule_barber.model';

@Injectable()
export class BarberService implements IBarberService {
  constructor(
    @InjectRepository(BarberStoreModel)
    private repository: Repository<BarberStoreModel>,
    @InjectRepository(ScheduleBarberModel)
    private scheduleRepository: Repository<ScheduleBarberModel>,
    private readonly validatorHelper: ValidatorHelper,
    private dataSource: DataSource,
  ) {}
  async scheduleBarber(
    dto: ScheduleCutBarberDto,
  ): Promise<ScheduleBarberModel> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const existingAppointments = await this.scheduleRepository.find({
        where: {
          barber_id: dto.barber_id,
        },
      });
      console.log('existingAppointments', existingAppointments);
      if (existingAppointments.length > 0) {
        // Verificar se há algum agendamento existente dentro de uma hora da nova data e hora
        const conflictingAppointment = existingAppointments.find(
          (appointment) =>
            Math.abs(
              appointment.schedule_date.getTime() -
                new Date(dto.schedule_date).getTime(),
            ) <
            60 * 60 * 1000,
        );
        if (conflictingAppointment) {
          throw new BadRequestException(
            'Já existe um corte agendado para esse horário',
          );
        }
      }

      const schedule = await queryRunner.manager.save(ScheduleBarberModel, {
        barber_id: dto.barber_id,
        client_id: dto.client_id,
        schedule_date: dto.schedule_date,
      });
      await queryRunner.commitTransaction();

      return schedule;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async signup(
    dto: BarberStore,
    owner_id: string,
    owner_name: string,
  ): Promise<BarberStore> {
    try {
      if (!this.validatorHelper.validateCnpj(dto.document)) {
        throw new BadRequestException('Invalid document');
      }
      const hasBarber = await this.repository.findOne({
        where: {
          document: dto.document,
        },
      });
      console.log(owner_name);
      console.log(owner_id);
      if (hasBarber) {
        throw new BadRequestException('Barber already exists');
      }

      this.repository.save({
        email: dto.email,
        document: dto.document,
        cellphone: dto.cellphone,
        address: dto.address,
        owner_name: owner_name,
        owner_id: owner_id,
        name: dto.name,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async searchBarber(dto: SearchBarberStore): Promise<BarberStoreModel[]> {
    try {
      const barbers = await this.repository.find({
        where: [
          {
            name: ILike(`%${dto.name}%`),
          },
          {
            document: ILike(`%${dto.document}%`),
          },
          {
            address: {
              state: ILike(`%${dto.state}%`),
              street: ILike(`%${dto.street}%`),
              neighborhood: ILike(`%${dto.neighborhood}%`),
              number: ILike(`%${dto.number}%`),
              cep: ILike(`%${dto.cep}%`),
            },
          },
        ],
      });
      if (barbers.length === 0) {
        throw new HttpException('Barber not found', HttpStatus.NO_CONTENT);
      }

      return barbers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
