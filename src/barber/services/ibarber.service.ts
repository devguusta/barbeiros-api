import {
  BarberStore,
  SearchBarberStore,
  UpdateWorkTimeDto,
} from '../domain/entities';
import { BarberStoreModel } from '../infra/model/barber_store.model';

export abstract class IBarberService {
  abstract signup(
    dto: BarberStore,
    owner_id: string,
    owner_name: string,
  ): Promise<BarberStore>;
  abstract searchBarber(dto: SearchBarberStore): Promise<BarberStoreModel[]>;
  abstract updateWorkTime(
    dto: UpdateWorkTimeDto,
    owner_id: string,
  ): Promise<void>;
}
