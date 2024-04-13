import { BarberStore, UpdateWorkTimeDto } from '../domain/entities';

export abstract class IBarberAdminService {
  abstract getMyStores(owner_id: string): Promise<BarberStore[]>;

  abstract updateWorkTime(
    dto: UpdateWorkTimeDto,
    owner_id: string,
  ): Promise<void>;
}
