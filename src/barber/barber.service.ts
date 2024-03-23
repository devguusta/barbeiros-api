import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberStoreModel } from './infra/model/barber_store.model';
import { Repository } from 'typeorm';
import { BarberStore } from './domain/entities';

@Injectable()
export class BarberService {
    constructor(
        @InjectRepository(BarberStoreModel)
        private repository: Repository<BarberStoreModel>
    ){
       
    }

    async signup(dto: BarberStore, owner_id: string, owner_name: string): Promise<BarberStore> {
        try {
            console
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
}
