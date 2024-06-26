import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from './infra/model/barber_store.model';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BarberStore, SearchBarberStore } from './domain/entities';
import { ValidatorHelper } from '../core/validators/validator_helper';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(BarberStoreModel)
    private repository: Repository<BarberStoreModel>,
    private readonly ValidatorHelper: ValidatorHelper,
  ) {}

  async signup(
    dto: BarberStore,
    owner_id: string,
    owner_name: string,
  ): Promise<BarberStore> {
    try {
      if (!this.ValidatorHelper.validateCnpj(dto.document)) {
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

  async searchBarberByName(
    dto: SearchBarberStore,
  ): Promise<BarberStoreModel[]> {
    try {
      const conditions: FindOptionsWhere<SearchBarberStore> = {};

      if (dto.name) {
        conditions.name = dto.name;
      }
      if (dto.document) conditions.document = dto.document;
      //   const barbers = await this.repository.find({
      //     where: conditions,
      //   });
      console.log(dto.name);

      const barbers = await this.repository.find({
        where: { name: ILike(`%${dto.name}%`) },
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
