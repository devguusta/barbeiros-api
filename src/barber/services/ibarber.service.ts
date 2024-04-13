import {
  BarberStore,
  ScheduleCutBarberDto,
  SearchBarberStore,
} from '../domain/entities';
import { BarberStoreModel } from '../infra/model/barber_store.model';
import { ScheduleBarberModel } from '../infra/model/schedule_barber.model';

export abstract class IBarberService {
  abstract signup(
    dto: BarberStore,
    owner_id: string,
    owner_name: string,
  ): Promise<BarberStore>;
  abstract searchBarber(dto: SearchBarberStore): Promise<BarberStoreModel[]>;

  abstract scheduleBarber(
    dto: ScheduleCutBarberDto,
  ): Promise<ScheduleBarberModel>;
}
