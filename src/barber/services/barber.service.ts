import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from '../infra/model/barber_store.model';
import { ILike, Repository } from 'typeorm';
import {
  BarberStore,
  SearchBarberStore,
  UpdateScheduleBarberDto,
} from '../domain/entities';
import { ValidatorHelper } from '../../core/validators/validator_helper';
import { IBarberService } from './ibarber.service';

@Injectable()
export class BarberService implements IBarberService {
  constructor(
    @InjectRepository(BarberStoreModel)
    private repository: Repository<BarberStoreModel>,
    private readonly validatorHelper: ValidatorHelper,
  ) {}
  async updateWorkTime(
    dto: UpdateScheduleBarberDto,
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
