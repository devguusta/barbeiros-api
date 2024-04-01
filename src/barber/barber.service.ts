import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from './infra/model/barber_store.model';
import { Like, Repository } from 'typeorm';
import { BarberStore, SearchBarberStore } from './domain/entities';
import { ValidatorHelper } from '../core/validators/validator_helper';

@Injectable()
export class BarberService {
    constructor(
        @InjectRepository(BarberStoreModel)
        private repository: Repository<BarberStoreModel>,
        private readonly ValidatorHelper: ValidatorHelper,
    ){
       
    }

    async signup(dto: BarberStore, owner_id: string, owner_name: string): Promise<BarberStore> {
        try {
            if(!this.ValidatorHelper.validateCnpj(dto.document)) {
                throw new BadRequestException('Invalid document');
            }
            const hasBarber = await  this.repository.findOne({
                where: {
                    document: dto.document
                }
            })
                console.log(owner_name);
                console.log(owner_id)
            if(hasBarber) {
                throw new BadRequestException('Barber already exists');
            }

            const store = this.repository.save({
                email: dto.email,
                document: dto.document,
                cellphone: dto.cellphone,
                address: dto.address,
                owner_name: owner_name,
                owner_id: owner_id,
                name: dto.name

            });

            return store;
            
        } catch (error) {
            throw error;
        }

    }

    async searchBarberByName(dto: SearchBarberStore): Promise<BarberStoreModel[]> {
        try {
            const barbers = await this.repository.createQueryBuilder('barber_store')
            .where('barber_store.name ILIKE :name', { name: `%${dto.name}%` })
            .orWhere('barber_store.document ILIKE :address', { document: `%${dto.document}%` })
            .getMany();
            if(!barbers) {
                throw new BadRequestException('Barber not found');
            }


            return barbers;
        } catch (error) {
            throw error;
        }
    }
}
